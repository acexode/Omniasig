import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  @HostBinding('class') color = 'ion-color-white-page';
  constructor(
    private routerS: CustomRouterService,
    private aRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private navCtrl: NavController,
    private locuinteS: LocuinteService,
    private formS: LocuinteFormService
  ) {}

  ngOnInit() {
    this.routerS
      .getNavigationEndEvent()
      .pipe(
        switchMap(() =>
          combineLatest([
            this.routerS.processChildDataAsync(this.aRoute, 'formMode'),
            this.routerS.processChildParamsAsync(this.aRoute, 'id'),
          ])
        )
      )
      .subscribe((vals: any) => {
        this.formMode = vals[0];
        this.setTitles();
        const id = vals[1];
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
      // case this.formModes.EDIT_FULL:
      //   this.headerConfig = subPageHeaderDefault('Adresa');
      //   break;
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
      case this.locuintaState.INCOMPLETE:
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

  formCustomEvents() {}

  handleFormSubmit() {}

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
}
