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
import { FormGroup, Validators } from '@angular/forms';
import { IonContent, ModalController } from '@ionic/angular';
import { get } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LocuinteFormService } from 'src/app/profile/pages/locuinte/services/locuinte-form/locuinte-form.service';
import { LocuinteService } from 'src/app/profile/pages/locuinte/services/locuinte/locuinte.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import {
  LocuinteFormModes,
  LocuinteFormType,
} from 'src/app/shared/models/modes/locuinte-form-modes';
import { AmplusService } from '../../services/amplus.service';
import { PadService } from '../../services/pad.service';
import { PaidExternalService } from '../../services/paid-external-service.service';
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
  dataModel: any = { id: null };
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
  toggleStreetInput = false;
  formSubmitting = false;
  formInstance: { group: FormGroup; config: any; data: any } = null;
  checkPAD = false;
  loaderTitle = 'Verificăm datele în portalul PAID…';
  paidResponseData = null;
  userId;

  @Input() formType: LocuinteFormType = LocuinteFormType.ADDRESS;
  @Input() policyType: string;
  @Input() formInputData = null;
  @Output() checkPadResponse: EventEmitter<any> = new EventEmitter();
  @Input() offerData = null;
  @Input() policyId;
  @Output() stepChange: EventEmitter<any> = new EventEmitter();
  @Output() dataAdded: EventEmitter<any> = new EventEmitter();
  @Output() errorEvent: EventEmitter<any> = new EventEmitter();
  constructor(
    private cdRef: ChangeDetectorRef,
    private formS: LocuinteFormService,
    private locuinteS: LocuinteService,
    public modalController: ModalController,
    private authS: AuthService,
    private amplusS: AmplusService,
    private paidS: PaidExternalService
  ) {
    this.authS.getAuthState().subscribe((authData) => {
      this.userId = authData.account.userId;
    });
  }

  ngOnInit() {
    this.paidResponseData = null;
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
          // We need to clear the validator when we have no data on the initial call.
          this.toggleStreetInput =
            get(this.formInstance.data.addressStreet, 'length', 0) === 0;
          if (
            this.addressStreet &&
            !get(this.formInstance.data, 'addressStreet', [])?.length
          ) {
            this.addressStreet.clearValidators();
            if (this.toggleStreetInput) {
              this.addressStreet.updateValueAndValidity();
            }
          }
          if (this.addressStreet || this.addressName) {
            this.formS.setInitialStreetValue(
              this.dataModel,
              this.addressStreet,
              this.addressName,
              this.formInstance.data
            );
          }
          this.cdRef.markForCheck();
          this.cdRef.detectChanges();
        });
      this.addressCounty.valueChanges.subscribe((val) => {
        if (this.addressCity) {
          this.addressCity.patchValue('');
          this.addressCity.updateValueAndValidity();
        }
        this.formS
          .updateCounty(
            this.addressCounty,
            this.formInstance.data,
            this.dataModel
          )
          .subscribe((v) => {
            if (this.addressCity) {
              this.addressCity.updateValueAndValidity({
                onlySelf: true,
              });
            }
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
          });
      });
    }
    if (this.addressCity) {
      this.addressCity.valueChanges.subscribe((val) => {
        this.formS.resetStreetFieldValues(
          this.addressStreet,
          this.addressName,
          this.addressStreetType,
          !this.toggleStreetInput,
          true
        );
        this.formS
          .updateCity(this.addressCity, this.formInstance.data, this.dataModel)
          .subscribe((v) => {
            this.toggleStreetInput =
              get(this.formInstance.data.addressStreet, 'length', 0) === 0;
            if (v && v.length) {
              this.formS.resetStreetFieldValues(
                this.addressStreet,
                this.addressName,
                this.addressStreetType,
                !this.toggleStreetInput,
                true
              );
              this.formS.handleStreetProcessing(
                val,
                this.formData,
                this.dataModel
              );
              this.formS.handlePostalCode(
                null,
                this.formInstance.data,
                this.addressPostalCode,
                this.addressCity ? this.addressCity.value : null
              );
            } else {
              this.formS.handlePostalCode(
                null,
                this.formInstance.data,
                this.addressPostalCode,
                this.addressCity ? this.addressCity.value : null
              );
              this.formS.resetStreetFieldValues(
                this.addressStreet,
                this.addressName,
                this.addressStreetType,
                !this.toggleStreetInput,
                true
              );
            }
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
        this.formS.handlePostalCode(
          val,
          this.formInstance.data,
          this.addressPostalCode,
          this.addressCity ? this.addressCity.value : null
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

  get addressStreetType() {
    return this.formInstance && this.formInstance.group
      ? this.formInstance.group.get('addressStreetType')
      : null;
  }

  get addressStreet() {
    return this.formInstance && this.formInstance.group
      ? this.formInstance.group.get('addressStreet')
      : null;
  }
  get addressName() {
    return this.formInstance && this.formInstance.group
      ? this.formInstance.group.get('addressName')
      : null;
  }
  get addressPostalCode() {
    return this.formInstance && this.formInstance.group
      ? this.formInstance.group.get('addressPostalCode')
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
              const resModel = get(v, 'response', {});
              this.formInstance = {
                config: this.formConfigs.place,
                group: this.formGroups.place,
                data: this.formData.place,
              };
              this.dataModel = { ...this.dataModel, ...resModel };
              const policy = this.paidResponseData
                ? {
                    dates: {
                      to: get(
                        this.paidResponseData,
                        'paidMinimStartDate',
                        null
                      ),
                    },
                  }
                : null;
              this.dataAdded.emit({
                locuinta: get(v, 'response', null),
                policy,
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
              const policy = this.paidResponseData
                ? {
                    dates: {
                      to: get(
                        this.paidResponseData,
                        'paidMinimStartDate',
                        null
                      ),
                    },
                  }
                : null;
              this.dataAdded.emit({
                locuinta: get(v, 'response', null),
                policy,
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
          this.formInstance.group.getRawValue(),
          this.dataModel,
          this.toggleStreetInput
        );
        this.formSubmitting = true;
        this.cdRef.markForCheck();
        if (this.dataModel && get(this.dataModel, 'id', null)) {
          this.dataModel.addressName = model2.addressName;
          return this.locuinteS.updateSingleLocuinte(model2).pipe(
            finalize(() => {
              this.formSubmitting = false;
              this.cdRef.markForCheck();
            })
          );
        } else {
          this.dataModel.addressName = model2.addressName;
          return this.locuinteS.addSingleLocuinte(model2).pipe(
            switchMap((data) => {
              return this.paidS
                .CheckPAD({
                  locationId: data.response.id,
                  userId: this.offerData.policy.userData.userId,
                })
                .pipe(
                  map((v) => {
                    this.paidResponseData = v;
                    if (this.policyId === 'AMPLUS') {
                      if (v.canHaveAmplus) {
                        this.formSubmitting = false;
                        this.cdRef.markForCheck();
                        return data;
                      } else {
                        this.checkPadResponse.emit(v);
                      }
                      return;
                    }
                    if (
                      this.policyId === 'PAD' ||
                      this.policyId === 'Garant AMPLUS + PAD'
                    ) {
                      if (v.hasPaid) {
                        this.checkPadResponse.emit(v);
                      } else {
                        this.formSubmitting = false;
                        this.cdRef.markForCheck();
                        return data;
                      }
                      return;
                    }
                    this.formSubmitting = false;
                    return data;
                  }),
                  catchError((e) => {
                    this.paidResponseData = null;
                    this.checkPadResponse.emit(e);
                    return of(e);
                  })
                );
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
