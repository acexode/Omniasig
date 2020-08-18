import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { cloneDeep, has } from 'lodash';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { policySubpageHeader } from '../../data/policy-subpage-header';
import { PolicyFormSteps } from './../../../../shared/models/modes/policy-form-steps';
import { PolicyDataService } from './../../services/policy-data.service';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.page.html',
  styleUrls: ['./policy-form.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyFormPage implements OnInit, OnDestroy {
  @ViewChild('dntComp', { static: false }) dntComp;
  @ViewChild('exclusionComp', { static: false }) exclusionComp;
  @ViewChild('infoDocComp', { static: false }) infoDocComp;

  @HostBinding('class')
  get color() {
    return this.bgWhite ? 'ion-color-white-page' : null;
  }
  bgWhite = false;
  headerConfig;
  policySteps = PolicyFormSteps;
  currentStep = PolicyFormSteps.DNT;
  typeItem;

  dntItem: any = 'success';
  exclusionItem: any = 'success';

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
        this.typeItem = cloneDeep(vals[1]);
        this.initConfigs();
        this.changeStep(vals[0]);
      });
  }

  initConfigs() {}

  setTitles() {
    switch (this.currentStep) {
      case this.policySteps.DNT:
        this.headerConfig = policySubpageHeader({
          title: 'Formular de analiză',
          hasTrailingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.EXCLUSION:
        this.headerConfig = policySubpageHeader({
          title: 'Condiții de excludere',
          backLink: false,
        });
        break;
      case this.policySteps.INFO_DOC:
        this.headerConfig = policySubpageHeader({
          title: 'Document de Informare',
          backLink: false,
        });
        break;
      case this.policySteps.ADDRESS_SELECT:
        this.headerConfig = policySubpageHeader({
          title: 'Adresă locuință',
          hasTrailingIcon: true,
          backLink: false,
        });
        break;
      default:
        this.headerConfig = policySubpageHeader({
          title: 'Polita',
          backLink: false,
        });
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

  back(forceChange = false) {
    switch (this.currentStep) {
      case this.policySteps.DNT:
        this.navigateBackDnt();
        break;
      case this.policySteps.EXCLUSION:
        if (forceChange) {
          this.changeStep(this.policySteps.INFO_DOC);
        } else {
          this.navigateBackExclusion();
        }

        break;
      case this.policySteps.INFO_DOC:
        if (has(this.typeItem, 'dntConfig', null)) {
          this.typeItem.dntConfig = {
            ...this.typeItem.dntConfig,
            ...{ initialStep: this.dntItem },
          };
        }
        this.changeStep(this.policySteps.DNT);
        break;
      case this.policySteps.ADDRESS_SELECT:
        this.changeStep(this.policySteps.EXCLUSION);
        break;
      default:
        break;
    }
  }

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
      default:
        break;
    }
  }

  setBgColor(forceWhite = null) {
    this.bgWhite = false;
    switch (this.currentStep) {
      case this.policySteps.DNT:
        this.bgWhite = false;
        break;
      case this.policySteps.INFO_DOC:
        this.bgWhite = true;
        break;
      default:
        break;
    }
    if (forceWhite !== null) {
      this.bgWhite = forceWhite;
      this.cdRef.markForCheck();
    }
  }

  dntEvents(event: string | number) {
    this.dntItem = event;
    if (event === 'success-btn') {
      this.dntItem = 'success';
      this.next();
    }
    if (event === 'cancel-ev') {
      this.dntItem = 'cancel';
      this.setBgColor(true);
    }
    if (event === 'cancel-btn' || event === -1) {
      this.exitFlow();
    }
  }

  navEvents(event: string | number) {
    
    this.exclusionItem = event;
    if (event === 'success-btn') {
      this.exclusionItem = 'success';
      this.next();
    }
    if (event === 'cancel-ev') {
      this.exclusionItem = 'cancel';
      this.setBgColor(true);
    }
    if (event === -1) {
      this.back(true);
    }
    if (event === 'cancel-btn') {
      this.exitFlow();
    }
  }

  navigateBackDnt() {
    if (this.dntComp) {
      this.dntComp.navigateInList('back', this.dntItem);
    }
  }

  navigateBackExclusion() {
    if (this.exclusionComp) {
      this.exclusionComp.navigateInList('back', this.exclusionItem);
    }
  }

  exitFlow() {
    this.navCtrl.navigateBack(['/policy']);
  }

  ngOnDestroy(): void {
    this.dntItem = null;
  }
}
