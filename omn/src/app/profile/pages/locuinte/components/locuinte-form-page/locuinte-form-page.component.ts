import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { combineLatest, Observable, of } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
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
  dataModel: Locuinte;
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
            this.locuinteS.getSingleLocuinta(id).subscribe(
              (val: Locuinte) => {
                if (val) {
                  this.dataModel = val;
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
        break;
    }
    this.locuinteS.getCounties().subscribe((val: any) => {
      const withLabel = val.map((v) => {
        return {
          id: v.id,
          label: v.name,
        };
      });
      this.formData.address.addressCounty = withLabel;
      this.cdRef.markForCheck();
    });

    if (this.addressCounty) {
      this.addressCounty.valueChanges.subscribe((val) => {
        this.locuinteS.getCities(val).subscribe((data: any) => {
          const withLabel = data.map((v) => {
            return {
              id: v.id,
              label: v.name,
            };
          });
          this.formInstance.data.addressCity = withLabel;
        });
      });
    }
    if (this.addressCity) {
      this.addressCity.valueChanges.subscribe((val) => {
        const addressCity = this.formInstance.data.addressCity.filter(
          (v) => v.id === val
        )[0];
        const obj = {
          countryId: addressCity.countryId,
          countyId: addressCity.countyId,
          cityId: addressCity.id,
          postCode: null,
          statedId: addressCity.statedId,
        };
        this.locuinteS.getStreets(obj).subscribe((v) => {
          this.locuinteS.streetStore$.next(v);
          this.cdRef.markForCheck();
        });
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

  buildFormAdd() {
    this.formConfigs.address = this.formS.buildFormConfig(
      LocuinteFormType.ADDRESS
    );
    this.formConfigs.place = this.formS.buildFormConfig(LocuinteFormType.PLACE);
    this.formData.address = this.formS.getFormFieldsData(
      this.formConfigs.address
    );
    this.formData.place = this.formS.getFormFieldsData(this.formConfigs.place);
    this.formGroups.address = this.formS.buildAddressSubform(this.dataModel);
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
              this.dataModel = v;
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
        const model = this.formS.processFormModel(
          this.formInstance.group.value,
          this.dataModel
        );
        this.formSubmitting = true;
        this.cdRef.markForCheck();
        return this.locuinteS.updateSingleLocuinte(model).pipe(
          finalize(() => {
            this.formSubmitting = false;
            this.cdRef.markForCheck();
          })
        );
      case this.formModes.ADD_NEW_FULL:
        const model2 = this.formS.processFormModel(
          this.formInstance.group.value,
          this.dataModel
        );
        this.formSubmitting = true;
        this.cdRef.markForCheck();
        if (this.dataModel) {
          const newUpdates = this.processForm(
            this.dataModel,
            this.formInstance.group.value
          );
          return this.locuinteS.updateSingleLocuinte(newUpdates).pipe(
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
  processForm(existing, newValue) {
    const model = { ...existing.response, ...newValue };
    model.yearConstruction = parseInt(model.yearConstruction, 10);
    return model;
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
