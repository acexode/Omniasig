import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { get, has } from 'lodash';
import { combineLatest, Observable, of } from 'rxjs';
import { finalize, switchMap, take } from 'rxjs/operators';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import {
  LocuinteFormModes,
  LocuinteFormType,
} from 'src/app/shared/models/modes/locuinte-form-modes';
import { LocuinteFormService } from '../../services/locuinte-form/locuinte-form.service';
import { LocuinteService } from './../../services/locuinte/locuinte.service';

@Component({
  selector: 'app-locuinte-form-page',
  templateUrl: './locuinte-form-page.component.html',
  styleUrls: ['./locuinte-form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocuinteFormPageComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  @ViewChild('contentRef', { static: true }) contentRef: IonContent;
  buttonText = 'Continuă';
  headerConfig = null;
  buttonVisible = true;
  toggleStreetInput = null;
  isHomeAddress = false;
  dataModel: any = { id: null };
  formMode: LocuinteFormModes;
  formType: LocuinteFormType;
  formModes = LocuinteFormModes;
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
  constructor(
    private routerS: CustomRouterService,
    private aRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private formS: LocuinteFormService,
    private navCtrl: NavController,
    private locuinteS: LocuinteService
  ) {}

  ngOnInit() {
    this.routerS
      .getNavigationEndEvent()
      .pipe(
        switchMap(() => {
          return combineLatest([
            this.routerS.processChildDataAsync(this.aRoute, 'formMode'),
            this.routerS.processChildParamsAsync(this.aRoute, 'id'),
          ]);
        })
      )
      .subscribe((vals: any) => {
        this.formMode = vals[0];
        const id = vals[1];
        this.setTitles();
        this.initConfigs(id).subscribe((v) => {
          this.initForm();
          this.cdRef.markForCheck();
        });
      });
  }

  setTitles() {
    switch (this.formMode) {
      case this.formModes.ADD_NEW_FULL:
        this.headerConfig = subPageHeaderDefault('Adresa');
        break;
      case this.formModes.EDIT_FULL:
        this.headerConfig = subPageHeaderDefault('Adresa');
        break;
      default:
        this.headerConfig = subPageHeaderDefault('Adresa');
        break;
    }
  }

  initConfigs(id) {
    return new Observable((observer) => {
      switch (this.formMode) {
        case this.formModes.ADD_NEW_FULL:
          this.buildFormAdd();
          observer.next(true);
          break;
        case this.formModes.EDIT_FULL:
          if (id) {
            this.locuinteS
              .getSingleLocuinta(id)
              .pipe(take(1))
              .subscribe(
                (val: Locuinte) => {
                  if (val) {
                    this.dataModel = val;
                    this.isHomeAddress = this.dataModel.isHomeAddress;
                    this.buildFormAdd();
                    observer.next(true);
                  } else {
                    this.navCtrl.navigateRoot(['/profil', 'locuinte']);
                    observer.next(false);
                  }
                },
                () => {
                  this.navCtrl.navigateRoot(['/profil', 'locuinte']);
                  observer.next(false);
                }
              );
          }
          break;
      }
    });
  }
  initForm() {
    switch (this.formMode) {
      case this.formModes.ADD_NEW_FULL:
      case this.formModes.EDIT_FULL:
        if (!this.formInstance) {
          this.formInstance = {
            config: this.formConfigs.address,
            group: this.formGroups.address,
            data: this.formData.address,
          };
        }
        this.formType = LocuinteFormType.ADDRESS;
        this.cdRef.markForCheck();
        this.cdRef.detectChanges();
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

          if (this.addressStreet || this.addressName) {
            this.formS.setInitialStreetValue(
              this.dataModel,
              this.addressStreet,
              this.addressName,
              this.formInstance.data
            );
          }
          this.formS.resetStreetFieldValues(
            this.addressStreet,
            this.addressName,
            this.addressStreetType,
            !this.toggleStreetInput,
            false
          );
          if (!get(this.addressCity, 'value', null)) {
            this.formS.disableFields([
              this.addressStreet,
              this.addressName,
              this.addressStreetType,
            ]);
          }
          this.cdRef.markForCheck();
          this.cdRef.detectChanges();
        });
      this.addressCounty.valueChanges.subscribe((val) => {
        if (this.addressCity) {
          this.addressCity.patchValue('');
          this.addressCity.updateValueAndValidity();
        }
        this.formS.disableFields([
          this.addressStreet,
          this.addressStreetType,
          this.addressName,
        ]);
        this.formS
          .updateCounty(
            this.addressCounty,
            this.formInstance.data,
            this.dataModel
          )
          .subscribe((v) => {
            if (this.addressCity) {
              this.addressCity.updateValueAndValidity({ onlySelf: true });
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
        this.formS.disableFields([
          this.addressStreet,
          this.addressStreetType,
          this.addressName,
        ]);
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
            if (!get(this.addressCity, 'value', null)) {
              this.formS.disableFields([
                this.addressStreet,
                this.addressName,
                this.addressStreetType,
              ]);
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
    const disabledAddress = get(this.dataModel, 'isHomeAddress', false);
    this.formConfigs.address = this.formS.buildFormConfig(
      LocuinteFormType.ADDRESS
    );
    this.formConfigs.place = this.formS.buildFormConfig(LocuinteFormType.PLACE);
    this.formData.address = this.formS.getFormFieldsData(
      this.formConfigs.address
    );
    this.formData.place = this.formS.getFormFieldsData(this.formConfigs.place);
    // We want to disable the Address input for the Home address.
    this.formGroups.address = this.formS.buildAddressSubform(
      this.dataModel,
      null,
      disabledAddress
    );
    this.formGroups.place = this.formS.buildLocuinteSubform(this.dataModel);
  }

  handleFormSubmit() {
    switch (this.formMode) {
      case this.formModes.ADD_NEW_FULL:
      case this.formModes.EDIT_FULL:
        this.buttonVisible = true;
        if (this.formType === LocuinteFormType.ADDRESS) {
          this.submitData().subscribe((v) => {
            if (v) {
              const resModel = v.hasOwnProperty('response')
                ? get(v, 'response', {})
                : v;

              this.dataModel = { ...this.dataModel, ...resModel };
              this.formType = LocuinteFormType.PLACE;
              this.buttonText = 'Salvează';
              const header = subPageHeaderDefault('Adresa');
              header.leadingIcon.routerLink = false;
              this.headerConfig = header;
              this.formInstance = {
                config: this.formConfigs.place,
                group: this.formGroups.place,
                data: this.formData.place,
              };
            }
          });
        } else if (this.formType === LocuinteFormType.PLACE) {
          this.submitData().subscribe((v) => {
            if (v) {
              const resModel = v.hasOwnProperty('response')
                ? get(v, 'response', {})
                : v;
              this.dataModel = { ...this.dataModel, ...resModel };
              this.formType = LocuinteFormType.SUCCESS_MSG;
              const header = subPageHeaderDefault('');
              header.leadingIcon = null;
              this.headerConfig = header;
              this.buttonVisible = false;
              this.refTimer = setTimeout(() => {
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

  navigateBack() {
    switch (this.formMode) {
      case this.formModes.ADD_NEW_FULL:
      case this.formModes.EDIT_FULL:
        this.buttonVisible = true;
        if (this.formType === LocuinteFormType.PLACE) {
          this.formInstance = {
            config: this.formConfigs.address,
            group: this.formGroups.address,
            data: this.formData.address,
          };
          this.formType = LocuinteFormType.ADDRESS;
          const header = subPageHeaderDefault('Adresa');
          this.buttonText = 'Continuă';
          header.leadingIcon.routerLink = null;
          this.headerConfig = header;
        }
        break;

      default:
        break;
    }
    this.cdRef.markForCheck();
    this.scrollTop();
  }

  submitData(): Observable<Locuinte> {
    switch (this.formMode) {
      case this.formModes.EDIT_FULL:
        // Don't proces
        const donTProcessAddress =
          this.formType === LocuinteFormType.ADDRESS &&
          get(this.dataModel, 'isHomeAddress', false);
        const model = donTProcessAddress
          ? this.dataModel
          : this.formS.processFormModel(
              this.formInstance.group.getRawValue(),
              this.dataModel,
              this.toggleStreetInput
            );
        this.dataModel.addressName = model.addressName;
        this.formSubmitting = true;
        this.cdRef.markForCheck();
        if (donTProcessAddress) {
          return of(this.dataModel).pipe(
            finalize(() => {
              this.formSubmitting = false;
              this.cdRef.markForCheck();
            })
          );
        }

        return this.locuinteS.updateSingleLocuinte(model).pipe(
          finalize(() => {
            this.formSubmitting = false;
            this.cdRef.markForCheck();
          })
        );
      case this.formModes.ADD_NEW_FULL:
        const model2 = this.formS.processFormModel(
          this.formInstance.group.getRawValue(),
          this.dataModel,
          this.toggleStreetInput
        );
        this.formSubmitting = true;
        this.dataModel.addressName = model2.addressName;
        this.cdRef.markForCheck();
        if (get(this.dataModel, 'id', null) !== null) {
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
      case this.formModes.ADD_NEW_FULL:
      case this.formModes.EDIT_FULL:
        if (this.formType === LocuinteFormType.SUCCESS_MSG) {
          this.navCtrl.navigateRoot(['/profil', 'locuinte']);
        }
        break;
      default:
        break;
    }
  }
}
