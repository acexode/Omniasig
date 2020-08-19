import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonContent, ModalController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';
import {
  Locuinte,
  LocuintaState,
} from 'src/app/shared/models/data/locuinte.interface';
import { LocuinteService } from '../../services/locuinte/locuinte.service';
import { LocuinteFormType } from 'src/app/shared/models/modes/locuinte-form-modes';
import { FormGroup } from '@angular/forms';
import { LocuinteFormService } from '../../services/locuinte-form/locuinte-form.service';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-locuinte-view',
  templateUrl: './locuinte-view.component.html',
  styleUrls: ['./locuinte-view.component.scss'],
})
export class LocuinteViewComponent implements OnInit {
  headerConfig = null;
  locuinta$: BehaviorSubject<Locuinte> = new BehaviorSubject(null);
  variant = 'not-insured'; // not-insured, not-found, found.
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
  @HostBinding('class') color = 'ion-color-white-page';
  @ViewChild('contentRef', { static: true }) contentRef: IonContent;
  constructor(
    private routerS: CustomRouterService,
    private aRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private navCtrl: NavController,
    private locuinteS: LocuinteService,
    private formS: LocuinteFormService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
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
          this.locuinteS.getSingleLocuinta(id).subscribe((val: Locuinte) => {
            if (val) {
              this.locuinta$.next(val);
              this.dataModel = val;
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
        break;
      case this.locuintaState.INVALID:
        this.headerConfig = subPageHeaderDefault('Confirmare domiciliu');
        break;
      default:
        this.headerConfig = subPageHeaderDefault('Locuințe');
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

  initForm() {
    switch (this.formMode) {
      case this.locuintaState.INVALID:
        this.buttonVisible = true;
        this.buttonText = 'Salvează';
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

      case this.locuintaState.INCOMPLETE:
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
    this.headerConfig = subPageHeaderPrimary('Informații  locuință');
    this.buttonVisible = true;
    this.buttonText = 'Salvează';
    this.formInstance = {
      config: this.formConfigs.place,
      group: this.formGroups.place,
      data: this.formData.place,
    };
    this.formType = LocuinteFormType.PLACE;
  }

  async confirmModal(v) {
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      cssClass: 'disabled-message-modal-class',
    });
    modal.onDidDismiss().then((data) => {
      const next = data['data'];
      if (next) {
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
    return await modal.present();
  }
}
