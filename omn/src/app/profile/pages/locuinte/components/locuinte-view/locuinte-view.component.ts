import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  IonContent,
  ModalController,
  NavController,
} from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { finalize, switchMap, take } from 'rxjs/operators';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { PaidExternalService } from 'src/app/modules/policy/services/paid-external.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';
import {
  LocuintaState,
  Locuinte,
} from 'src/app/shared/models/data/locuinte.interface';
import { LocuinteFormType } from 'src/app/shared/models/modes/locuinte-form-modes';
import { LocuinteFormService } from '../../services/locuinte-form/locuinte-form.service';
import { LocuinteService } from '../../services/locuinte/locuinte.service';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-locuinte-view',
  templateUrl: './locuinte-view.component.html',
  styleUrls: ['./locuinte-view.component.scss'],
})
export class LocuinteViewComponent implements OnInit {
  headerConfig = null;
  locuinta$: BehaviorSubject<Locuinte> = new BehaviorSubject(null);
  variant = 'not-found'; // not-insured, not-found, found.
  dataModel: Locuinte;
  formMode: LocuintaState;
  locuintaState = LocuintaState;
  formType: LocuinteFormType;
  locuinteFormType = LocuinteFormType;
  formStep: LocuinteFormType;
  formConfigs: {
    address: any;
    place: any;
  } = {
    address: {},
    place: {},
  };
  formGroups: {
    address: FormGroup;
    place: FormGroup;
  } = {
    address: null,
    place: null,
  };
  formData: {
    address: any;
    place: any;
  } = {
    address: {},
    place: {},
  };
  formInstance: { group: FormGroup; config: any; data: any } = null;
  buttonVisible: boolean;
  buttonText: string;
  formSubmitting: boolean;
  refTimer;
  @HostBinding('class') color = null;
  @ViewChild('contentRef', { static: true }) contentRef: IonContent;
  checkPAD$: Observable<any>;
  constructor(
    private routerS: CustomRouterService,
    private aRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private navCtrl: NavController,
    private locuinteS: LocuinteService,
    private formS: LocuinteFormService,
    public modalController: ModalController,
    private paidES: PaidExternalService,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    // checkpad for the locuite first (this is to be done first: suggested by adrian)
    this.aRoute.data.subscribe((resolveData) => {
      this.checkPAD$ = this.paidES.CheckPAD({
        locationId: resolveData.data.locationId,
        userId: resolveData.data.userId,
      });
    });
    /*  */
    this.routerS
      .getNavigationEndEvent()
      .pipe(
        switchMap(() =>
          combineLatest([
            this.routerS.processChildDataAsync(this.aRoute, 'formMode'),
            this.routerS.processChildDataAsync(this.aRoute, 'formStep'),
            this.routerS.processChildParamsAsync(this.aRoute, 'id'),
          ])
        )
      )
      .subscribe((vals: any) => {
        this.formMode = vals[0];
        this.formStep = vals[1];
        this.setTitles();
        const id = vals[2];
        if (id) {
          this.locuinteS
            .getSingleLocuinta(id)
            .pipe(take(1))
            .subscribe((val: Locuinte) => {
              if (val) {
                this.dataModel = val;
                this.locuinta$.next(val);
                this.buildFormAdd();
                this.initForm();
                this.cdRef.markForCheck();
              } else {
                this.navCtrl.navigateRoot(['/profil', 'locuinte']);
              }
            });
        } else {
          this.navCtrl.navigateRoot(['/profil', 'locuinte']);
        }
      });
  }

  setTitles() {
    switch (this.formMode) {
      case this.locuintaState.INCOMPLETE:
        this.headerConfig = subPageHeaderDefault('Adresa');
        // this.color = '';
        break;
      case this.locuintaState.INVALID:
        this.headerConfig = subPageHeaderDefault('Confirmare domiciliu');
        this.color = 'ion-color-white-page';
        break;
      default:
        this.headerConfig = subPageHeaderDefault('Locuin??e');
        this.color = 'ion-color-white-page';
        break;
    }
  }

  demoType() {
    switch (this.variant) {
      case 'not-insured':
        this.variant = 'not-found';
        break;
      case 'not-found':
        this.variant = 'found';
        break;
      case 'found':
      default:
        this.variant = 'not-insured';
        break;
    }
  }
  deleteAddress(id) {
    const obj = {
      id,
      disabledReason: 'Disabled by user',
    };
    this.locuinteS.disableLocationForAddressId(obj).subscribe((v) => {
      this.navCtrl.navigateRoot(['/profil', 'locuinte']);
    });
  }
  initForm() {
    switch (this.formMode) {
      case this.locuintaState.INVALID:
        this.buttonVisible = true;
        this.buttonText = 'Salveaz??';
        if (!this.formInstance) {
          if (this.formStep === LocuinteFormType.ADDRESS) {
            this.formInstance = {
              config: this.formConfigs.address,
              group: this.formGroups.address,
              data: this.formData.address,
            };
            this.formType = LocuinteFormType.ADDRESS;
          } else {
            this.nextStep();
          }
        }
        break;
      case this.locuintaState.INCOMPLETE:
        if (!this.formInstance) {
          if (this.formStep === LocuinteFormType.ADDRESS) {
            this.formInstance = {
              config: this.formConfigs.address,
              group: this.formGroups.address,
              data: this.formData.address,
            };
            this.formType = LocuinteFormType.ADDRESS;
          } else {
            this.nextStep();
          }
        }

        break;
    }
  }

  buildFormAdd() {
    const disabled = this.formMode === this.locuintaState.INCOMPLETE;

    this.formConfigs.address = this.formS.buildFormConfig(
      LocuinteFormType.ADDRESS,
      null,
      disabled
    );
    this.formConfigs.place = this.formS.buildFormConfig(LocuinteFormType.PLACE);
    this.formData.address = this.formS.getFormFieldsData(
      this.formConfigs.address
    );
    this.formData.place = this.formS.getFormFieldsData(this.formConfigs.place);
    this.formGroups.address = this.formS.buildAddressSubform(this.dataModel);
    this.formGroups.place = this.formS.buildLocuinteSubform(this.dataModel);
  }

  formCustomEvents() {}

  handleFormSubmit() {
    this.buttonVisible = true;
    if (this.formType === LocuinteFormType.ADDRESS) {
      this.submitData().subscribe(async (v) => {
        if (v) {
          this.confirmModal(v);
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

    this.cdRef.markForCheck();
    this.scrollTop();
  }

  submitData(): Observable<Locuinte> {
    switch (this.formMode) {
      case this.locuintaState.INVALID:
        const model = this.formS.processFormModel(
          this.formInstance.group.getRawValue(),
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

      case this.locuintaState.INCOMPLETE:
        const model2 = this.formS.processFormModel(
          this.formInstance.group.getRawValue(),
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

  navigateToMain() {
    switch (this.formMode) {
      case this.locuintaState.INCOMPLETE:
      case this.locuintaState.INVALID:
        if (this.formType === LocuinteFormType.SUCCESS_MSG) {
          this.navCtrl.navigateRoot(['/profil', 'locuinte']);
        }
        break;
      default:
        break;
    }
  }

  scrollTop() {
    if (this.contentRef) {
      this.contentRef.scrollToTop();
    }
  }

  nextStep() {
    this.headerConfig = subPageHeaderPrimary('Informa??ii  locuin????');
    this.color = 'ion-color-white-page';
    this.buttonVisible = true;
    this.buttonText = 'Salveaz??';
    this.formInstance = {
      config: this.formConfigs.place,
      group: this.formGroups.place,
      data: this.formData.place,
    };
    this.formType = LocuinteFormType.PLACE;
  }
  async openConfirmDeleteModal(id) {
    let actionSheet = null;
    this.actionSheetController
      .create({
        cssClass: 'locuinte-sheet s24-h32 red-title',
        header: 'Esti sigur ca doresti sa stergi adresa?',
        buttons: [
          {
            text: 'Da',
            cssClass:
              'm-0 w-100 no-shadow ion-color text-weight-medium ion-color-success flat button button-block button-large button-solid',
            handler: () => {
              this.deleteAddress(id);
            },
          },
          {
            text: 'Renun????',
            role: 'cancel',
            handler: () => {},
            cssClass:
              'm-0 w-100 no-shadow ion-color-secondary button button-block button-large button-solid',
          },
        ],
      })
      .then((v) => {
        actionSheet = v;
        actionSheet.present();
      });
  }

  async confirmModal(v) {
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      cssClass: 'disabled-message-modal-class',
    });
    modal.onDidDismiss().then((data) => {
      const value = 'data';
      const next = data[value];
      if (next) {
        this.dataModel = v;
        this.formType = LocuinteFormType.PLACE;
        this.buttonText = 'Salveaz??';
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
    return await modal.present();
  }
}
