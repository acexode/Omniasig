import { LocuinteService } from './../../services/locuinte/locuinte.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import {
  LocuinteFormModes,
  LocuinteFormType,
} from 'src/app/shared/models/modes/locuinte-form-modes';
import { LocuinteFormService } from '../../services/locuinte-form/locuinte-form.service';

@Component({
  selector: 'app-locuinte-form-page',
  templateUrl: './locuinte-form-page.component.html',
  styleUrls: ['./locuinte-form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocuinteFormPageComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = null;
  buttonVisible = true;
  dataModel: Locuinte;
  formMode: LocuinteFormModes;
  formType: LocuinteFormType;
  formModes = LocuinteFormModes;
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
          this.formType = LocuinteFormType.PLACE;
          const header = subPageHeaderDefault('Adresa');
          header.leadingIcon.routerLink = false;
          this.headerConfig = header;
          this.formInstance = {
            config: this.formConfigs.place,
            group: this.formGroups.place,
            data: this.formData.place,
          };
        } else if (this.formType === LocuinteFormType.PLACE) {
          this.formType = LocuinteFormType.SUCCESS_MSG;
          const header = subPageHeaderDefault('');
          header.leadingIcon = null;
          this.headerConfig = header;
          this.buttonVisible = false;
          setTimeout(() => {
            this.navigateToMain();
          }, 4000);
        }
        break;
      default:
        break;
    }
    this.cdRef.markForCheck();
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
          header.leadingIcon.routerLink = null;
          this.headerConfig = header;
        }
        break;

      default:
        break;
    }
    this.cdRef.markForCheck();
  }

  trailingAction() {}

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
