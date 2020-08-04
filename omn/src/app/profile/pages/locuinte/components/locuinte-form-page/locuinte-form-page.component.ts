import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  HostBinding,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import {
  LocuinteFormModes,
  LocuinteFormType,
} from 'src/app/shared/models/modes/locuinte-form-modes';
import { FormGroup } from '@angular/forms';
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
    private formS: LocuinteFormService
  ) {}

  ngOnInit() {
    this.routerS
      .getNavigationEndEvent()
      .pipe(
        switchMap(() => {
          return this.routerS.processChildDataAsync(this.aRoute, 'formMode');
        })
      )
      .subscribe((fM) => {
        this.formMode = fM;
        this.initConfigs();
        this.setTitles();
        this.initForm();
        this.cdRef.markForCheck();
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

  initConfigs() {
    switch (this.formMode) {
      case this.formModes.ADD_NEW_FULL:
      case this.formModes.EDIT_FULL:
        this.buildFormAdd();
        break;
    }
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
        if (this.formType === LocuinteFormType.ADDRESS) {
          this.formType = LocuinteFormType.PLACE;
          this.formInstance = {
            config: this.formConfigs.place,
            group: this.formGroups.place,
            data: this.formData.place,
          };
        }
        break;

      default:
        break;
    }
    this.cdRef.markForCheck();
  }
}
