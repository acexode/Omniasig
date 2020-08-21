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
import { IonContent } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LocuinteFormService } from 'src/app/profile/pages/locuinte/services/locuinte-form/locuinte-form.service';
import { LocuinteService } from 'src/app/profile/pages/locuinte/services/locuinte/locuinte.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import {
  LocuinteFormModes,
  LocuinteFormType,
} from 'src/app/shared/models/modes/locuinte-form-modes';

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
  @Output() stepChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private cdRef: ChangeDetectorRef,
    private formS: LocuinteFormService,
    private locuinteS: LocuinteService
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
          this.submitData().subscribe((v) => {
            if (v) {
              this.dataModel = v;
              this.formType = LocuinteFormType.PAD_CHECK;
              this.formInstance = {
                config: this.formConfigs.place,
                group: this.formGroups.place,
                data: this.formData.place,
              };
              this.stepChange.emit(this.formType);
              // TODO: Remove when real service;
              this.refTimer = setTimeout(() => {
                this.handleFormSubmit();
              }, 5000);
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
              this.refTimer = setTimeout(() => {
                this.stepChange.emit('NEXT');
                this.navigateToMain();
              }, 2000);
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
        }
        this.stepChange.emit(this.formType);
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
        if (this.dataModel) {
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
}
