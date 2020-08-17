import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  HostBinding,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { policyTypes } from 'src/app/shared/models/data/policy-types';
import { PolicyFormSteps } from './../../../../shared/models/modes/policy-form-steps';
import { PolicyDataService } from './../../services/policy-data.service';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.page.html',
  styleUrls: ['./policy-form.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyFormPage implements OnInit {
  @HostBinding('class') get color() {
    return this.bgWhite ? 'ion-color-white-page' : null;
  }
  bgWhite = false;
  headerConfig;
  policySteps = PolicyFormSteps;
  currentStep = PolicyFormSteps.DNT;
  typeItem = policyTypes.PAD;
  constructor(
    private routerS: CustomRouterService,
    private aRoute: ActivatedRoute,
    private authS: AuthService,
    private policyD: PolicyDataService,
    private navCtrl: NavController,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.routerS
      .getNavigationEndEvent()
      .pipe(
        switchMap(() => {
          return combineLatest([
            this.routerS.processChildDataAsync(this.aRoute, 'step'),
            this.routerS.processChildDataAsync(this.aRoute, 'policyType'),
          ]);
        })
      )
      .subscribe((vals: any) => {
        this.typeItem = vals[1];
        this.initConfigs();
        this.changeStep(vals[0]);
      });
  }

  initConfigs() {}

  setTitles() {
    switch (this.currentStep) {
      case this.policySteps.DNT:
        this.headerConfig = subPageHeaderDefault('Formular de analiză');
        break;
      case this.policySteps.EXCLUSION:
        this.headerConfig = subPageHeaderDefault('Condiții de excludere');
        break;
      case this.policySteps.INFO_DOC:
        this.headerConfig = subPageHeaderDefault('Document de Informare');
        break;
      case this.policySteps.ADDRESS_SELECT:
        this.headerConfig = subPageHeaderDefault('Adresă locuință');
        break;
      default:
        this.headerConfig = subPageHeaderDefault('Polita');
        break;
    }
  }
  changeStep(step: PolicyFormSteps) {
    this.bgWhite = false;
    this.currentStep = step;
    this.setTitles();
    this.setBgColor();
    this.cdRef.markForCheck();
  }
  back() {}

  next() {
    switch (this.currentStep) {
      case this.policySteps.DNT:
        this.changeStep(this.policySteps.INFO_DOC);
        break;
      case this.policySteps.EXCLUSION:
        this.changeStep(this.policySteps.ADDRESS_SELECT);
        break;
      case this.policySteps.INFO_DOC:
        this.changeStep(this.policySteps.EXCLUSION);
        break;
      // case this.policySteps.ADDRESS_SELECT:
      //   break;
      default:
        // this.headerConfig = subPageHeaderDefault('Polita');
        break;
    }
  }

  setBgColor(forceWhite = null) {
    this.bgWhite = false;
    switch (this.currentStep) {
      case this.policySteps.DNT:
        this.bgWhite = false;
        break;
      case this.policySteps.EXCLUSION:
        break;
      case this.policySteps.INFO_DOC:
        this.bgWhite = true;
        break;
      // case this.policySteps.ADDRESS_SELECT:
      //   break;
      default:
        // this.headerConfig = subPageHeaderDefault('Polita');
        break;
    }
    if (forceWhite !== null) {
      this.bgWhite = forceWhite;
      this.cdRef.markForCheck();
    }
  }

  dntEvents(event: string) {
    if (event === 'success-btn') {
      this.next();
    }
    if (event === 'cancel-ev') {
      this.setBgColor(true);
    }
    if (event === 'cancel-btn') {
      this.exitFlow();
    }
  }

  navEvents(event: string) {
    if (event === 'success-btn') {
      this.next();
    }
    if (event === 'cancel-ev') {
      this.setBgColor(true);
    }
    if (event === 'cancel-btn') {
      this.exitFlow();
    }
  }

  exitFlow() {
    this.navCtrl.navigateBack(['/policy']);
  }
}
