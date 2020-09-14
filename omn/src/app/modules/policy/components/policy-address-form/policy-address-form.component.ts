import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonContent, ModalController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { LocuinteFormService } from 'src/app/profile/pages/locuinte/services/locuinte-form/locuinte-form.service';
import { LocuinteService } from 'src/app/profile/pages/locuinte/services/locuinte/locuinte.service';
import { PadService } from '../../services/pad.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import {
  LocuinteFormModes,
  LocuinteFormType,
} from 'src/app/shared/models/modes/locuinte-form-modes';
import { get } from 'lodash';
import { PolicyValoareModalComponent } from './../modals/policy-valoare-modal/policy-valoare-modal.component';

@Component({
  selector: 'app-policy-address-form',
  templateUrl: './policy-address-form.component.html',
  styleUrls: ['./policy-address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyAddressFormComponent implements OnInit {
  @ViewChild('contentRef', { static: true }) contentRef: IonContent;
  buttonText = 'Continuă';
  headerConfig = null;
  buttonVisible = true;
  dataModel: Locuinte;
  formMode: LocuinteFormModes = LocuinteFormModes.ADD_NEW_POLICY;
  formModes = LocuinteFormModes;
  formTypes = LocuinteFormType;
  refTimer;
  formGroups: {
    address: FormGroup;
    place: FormGroup;
  } = {
    address: null,
    place: null,
  };
  formConfigs: {
    address: any;
    place: any;
  } = {
    address: {},
    place: {},
  };
  formData: {
    address: any;
    place: any;
  } = {
    address: {},
    place: {},
  };

  formSubmitting = false;
  formInstance: { group: FormGroup; config: any; data: any } = null;

  @Input() formType: LocuinteFormType = LocuinteFormType.ADDRESS;
  @Input() policyType: string;
  @Input() formInputData = null;
  @Output() stepChange: EventEmitter<any> = new EventEmitter();
  @Output() dataAdded: EventEmitter<any> = new EventEmitter();
  constructor(
    private cdRef: ChangeDetectorRef,
    private formS: LocuinteFormService,
    private locuinteS: LocuinteService,
    private padS: PadService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.setTitles();
    this.initConfigs().subscribe((v) => {
      this.initForm();
      this.cdRef.markForCheck();
    });
  }

  setTitles() {}

  initConfigs() {
    return new Observable((observer) => {
      switch (this.formMode) {
        case this.formModes.ADD_NEW_POLICY:
          this.buildFormAdd();
          observer.next(true);
          break;
      }
    });
  }

  initForm() {
    switch (this.formMode) {
      case this.formModes.ADD_NEW_POLICY:
        if (!this.formInstance) {
          this.formInstance = {
            config: this.formConfigs.address,
            group: this.formGroups.address,
            data: this.formData.address,
          };
        }
        this.formType = LocuinteFormType.ADDRESS;
        break;
    }
    if (this.addressCounty) {
      this.formS
        .handleInitialCounty(this.addressCounty, this.formInstance.data)
        .pipe(
          switchMap((vals) => {
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
            if (this.addressCity) {
              return this.formS.handleInitialCityAndStreets(
                this.addressCounty,
                this.addressCity,
                this.formInstance.data
              );
            } else {
              return of(true);
            }
          })
        )
        .subscribe((v) => {
          this.cdRef.markForCheck();
          this.cdRef.detectChanges();
        });
      this.addressCounty.valueChanges.subscribe((val) => {
        this.formS
          .updateCounty(
            this.addressCounty,
            this.formInstance.data,
            this.dataModel
          )
          .subscribe((v) => {
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
            if (this.addressCity) {
              this.addressCity.updateValueAndValidity({
                onlySelf: true,
              });
            }
          });
      });
    }
    if (this.addressCity) {
      this.addressCity.valueChanges.subscribe((val) => {
        this.formS
          .updateCity(this.addressCity, this.formInstance.data, this.dataModel)
          .subscribe((v) => {
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
          });
      });
    }
    if (this.addressStreet) {
      this.addressStreet.valueChanges.subscribe((val) => {
        this.formS.handleStreetProcessing(
          val,
          this.formInstance.data,
          this.dataModel
        );
      });
    }
  }

  get addressCounty() {
    return this.formInstance && this.formInstance.group
      ? this.formInstance.group.get('addressCounty')
      : null;
  }

  get addressCity() {
    return this.formInstance && this.formInstance.group
      ? this.formInstance.group.get('addressCity')
      : null;
  }

  get addressStreet() {
    return this.formInstance && this.formInstance.group
      ? this.formInstance.group.get('addressStreet')
      : null;
  }
  buildFormAdd() {
    this.formConfigs.address = this.formS.buildFormConfig(
      LocuinteFormType.ADDRESS,
      this.policyType
    );
    this.formConfigs.place = this.formS.buildFormConfig(
      LocuinteFormType.PLACE,
      this.policyType
    );
    this.formData.address = this.formS.getFormFieldsData(
      this.formConfigs.address
    );
    this.formData.place = this.formS.getFormFieldsData(this.formConfigs.place);
    this.formGroups.address = this.formS.buildAddressSubform(
      this.dataModel,
      this.policyType
    );
    this.formGroups.place = this.formS.buildLocuinteSubform(
      this.dataModel,
      this.policyType
    );
  }

  handleFormSubmit() {
    switch (this.formMode) {
      case this.formModes.ADD_NEW_POLICY:
        this.buttonVisible = true;
        if (this.formType === LocuinteFormType.ADDRESS) {
          this.formType = LocuinteFormType.PAD_CHECK;
          this.submitData().subscribe((v) => {
            if (v) {
              this.dataModel = get(v, 'response', {});
              this.formInstance = {
                config: this.formConfigs.place,
                group: this.formGroups.place,
                data: this.formData.place,
              };
              this.dataAdded.emit({
                locuinta: get(v, 'response', null),
              });
              this.stepChange.emit(this.formType);
              this.handleFormSubmit();
            }
          });
        } else if (this.formType === LocuinteFormType.PAD_CHECK) {
          this.formType = LocuinteFormType.PLACE;
          this.buttonText = 'Salvează';
          this.formInstance = {
            config: this.formConfigs.place,
            group: this.formGroups.place,
            data: this.formData.place,
          };
          this.stepChange.emit(this.formType);
        } else if (this.formType === LocuinteFormType.PLACE) {
          this.submitData().subscribe((v) => {
            if (v) {
              const header = subPageHeaderDefault('');
              header.leadingIcon = null;
              this.headerConfig = header;
              this.buttonVisible = false;
              this.dataAdded.emit({
                locuinta: v,
              });
              this.stepChange.emit('NEXT');
            }
          });
        }
        break;
      default:
        break;
    }
    this.cdRef.markForCheck();
    this.scrollTop();
  }

  public navigateBack() {
    switch (this.formMode) {
      case this.formModes.ADD_NEW_POLICY:
        this.buttonVisible = true;
        if (this.formType === LocuinteFormType.PLACE) {
          this.formInstance = {
            config: this.formConfigs.address,
            group: this.formGroups.address,
            data: this.formData.address,
          };
          this.formType = LocuinteFormType.ADDRESS;
        } else if (this.formType === LocuinteFormType.ADDRESS) {
          this.stepChange.emit('BACK');
        } else {
          this.stepChange.emit(this.formType);
        }
        break;

      default:
        this.stepChange.emit('BACK');
        break;
    }
    this.cdRef.markForCheck();
    this.scrollTop();
  }

  submitData(): Observable<Locuinte> {
    switch (this.formMode) {
      case this.formModes.ADD_NEW_POLICY:
        const model2 = this.formS.processFormModel(
          this.formInstance.group.value,
          this.dataModel
        );
        this.formSubmitting = true;
        this.cdRef.markForCheck();
        if (this.dataModel && get(this.dataModel, 'id', null)) {
          return this.locuinteS.updateSingleLocuinte(model2).pipe(
            finalize(() => {
              this.formSubmitting = false;
              this.cdRef.markForCheck();
            })
          );
        } else {
          return this.locuinteS.addSingleLocuinte(model2).pipe(
            finalize(() => {
              this.formSubmitting = false;
              this.cdRef.markForCheck();
            })
          );
        }

      default:
        return of(null);
    }
  }

  trailingAction() {}
  scrollTop() {
    if (this.contentRef) {
      this.contentRef.scrollToTop();
    }
  }
  formCustomEvents() {
    // Add more as needed.
    this.navigateToMain();
  }

  navigateToMain() {
    switch (this.formMode) {
      case this.formModes.ADD_NEW_POLICY:
        break;
      default:
        break;
    }
  }

  async openModal(typeV) {
    if (typeV === 'VALOARE_MODAL') {
      const modal = await this.modalController.create({
        component: PolicyValoareModalComponent,
        cssClass: 'my-custom-modal-class',
      });
      return await modal.present();
    }
  }
}
