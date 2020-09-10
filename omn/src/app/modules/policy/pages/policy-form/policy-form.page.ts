import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { cloneDeep, get, has } from 'lodash';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { PolicyType } from 'src/app/shared/models/data/policy-type';
import { LocuinteFormType } from 'src/app/shared/models/modes/locuinte-form-modes';
import { policySubpageHeader } from '../../data/policy-subpage-header';
import { Account } from './../../../../core/models/account.interface';
import { LocuinteService } from './../../../../profile/pages/locuinte/services/locuinte/locuinte.service';
import { PolicyLocuintaListItem } from './../../../../shared/models/component/policy-locuinta-list-item';
import { PolicyItem } from './../../../../shared/models/data/policy-item';
import { PolicyOffer } from './../../../../shared/models/data/policy-offer';
import { PolicyFormSteps } from './../../../../shared/models/modes/policy-form-steps';
import { PolicyDataService } from './../../services/policy-data.service';
import { PolicyFormService } from './../../services/policy-form.service';
import { policyTypes } from 'src/app/shared/models/data/policy-types';

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
  @ViewChild('addressFormComp', { static: false }) addressFormComp;

  @HostBinding('class')
  get color() {
    return this.bgWhite ? 'ion-color-white-page' : null;
  }
  bgWhite = false;
  headerConfig;
  policySteps = PolicyFormSteps;
  currentStep = PolicyFormSteps.DNT;
  typeItem;
  loaderTitle = 'Calculăm costul poliței de asigurare…';

  policyLocuintaData$: BehaviorSubject<
    Array<PolicyLocuintaListItem>
  > = new BehaviorSubject([]);
  dntItem: any = 'success';
  exclusionItem: any = 'success';
  locuintaFormType: LocuinteFormType = LocuinteFormType.ADDRESS;

  // Stored Data:
  selectedAddressItem: PolicyLocuintaListItem;
  cesiuneData;
  periodStartData;
  userAccount: Account;
  minPeriodStartDate;
  maxPeriodStartDate;
  // This will contain all data needed for an offer.
  offerData: PolicyOffer = null;
  policyID;
  reftime;
  constructor(
    private routerS: CustomRouterService,
    private aRoute: ActivatedRoute,
    private authS: AuthService,
    private policyD: PolicyDataService,
    private locS: LocuinteService,
    private policyFs: PolicyFormService,
    private navCtrl: NavController,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserAccount();
    this.routerS
      .getNavigationEndEvent()
      .pipe(
        switchMap(() => {
          return combineLatest([
            this.routerS.processChildDataAsync(this.aRoute, 'step'),
          ]);
        })
      )
      .subscribe((vals: any) => {
        this.policyID = this.aRoute.snapshot.queryParamMap.get('policyID');
        switch (this.policyID) {
          case 'AMPLUS':
            this.typeItem = policyTypes.AMPLUS;
            break;
          case 'PAD':
            this.typeItem = policyTypes.PAD;
            break;
          case 'Garant AMPLUS+ PAD':
            this.typeItem = policyTypes.AMPLUS_PAD;
            break;
          default:
            break;
        }

        this.loadLocuinte();
        this.changeStep(vals[0]);
      });
  }

  loadUserAccount() {
    this.authS.getAccountData().subscribe((acc) => (this.userAccount = acc));
  }

  // Load Address + policy combination data. Used in the address picker.
  loadLocuinte() {
    combineLatest([
      this.locS.locuinteStore$,
      // TODO: Update this once we decide if we use the user Id.
      this.policyD.policyStore$,
    ]).subscribe((vals) => {
      this.policyLocuintaData$.next(
        this.policyFs.buildPolicyLocuintaModel(vals, this.typeItem.id)
      );
    });
  }

  /**
   * Switch titles depending on steps.
   */
  setTitles() {
    switch (this.currentStep) {
      case this.policySteps.DNT:
        this.headerConfig = policySubpageHeader({
          title: 'Formular de analiză',
          hasTrailingIcon: true,
          backLink: false,
          hasLeadingIcon: true,
        });
        break;
      case this.policySteps.EXCLUSION:
        if (this.exclusionItem === 'cancel-ev') {
          this.headerConfig = policySubpageHeader({
            title: 'Call Center',
            backLink: false,
            hasTrailingIcon: true,
            hasLeadingIcon: true,
          });
        } else {
          this.headerConfig = policySubpageHeader({
            title: 'Condiții de excludere',
            backLink: false,
            hasTrailingIcon: true,
            hasLeadingIcon: true,
          });
        }
        break;
      case this.policySteps.INFO_DOC:
        this.headerConfig = policySubpageHeader({
          title: 'Document de Informare',
          backLink: false,
          hasTrailingIcon: true,
        });
        break;
      case this.policySteps.ADDRESS_SELECT:
        this.headerConfig = policySubpageHeader({
          title: 'Adresă locuință',
          hasTrailingIcon: true,
          hasLeadingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.ADDRESS_FORM:
        this.headerConfig = policySubpageHeader({
          title: 'Adresă nouă',
          hasTrailingIcon: true,
          hasLeadingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.LOCATION_FORM:
        this.headerConfig = policySubpageHeader({
          title: 'Informații locuință',
          hasTrailingIcon: true,
          hasLeadingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.PAD_CHECK:
        this.headerConfig = policySubpageHeader({
          title: 'Verificare',
          hasTrailingIcon: false,
          hasLeadingIcon: false,
          backLink: false,
        });
        break;
      case this.policySteps.CESIUNE_FORM:
        this.headerConfig = policySubpageHeader({
          title: 'Ipotecă',
          hasTrailingIcon: true,
          hasLeadingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.PERIOD_FORM:
        this.headerConfig = policySubpageHeader({
          title: 'Perioada de asigurare',
          hasTrailingIcon: true,
          hasLeadingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.POLICY_VERIFY:
        this.headerConfig = policySubpageHeader({
          title: 'Verificare date',
          hasTrailingIcon: true,
          hasLeadingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.TECHNICAL_SUPPORT:
        this.headerConfig = policySubpageHeader({
          title: 'Asistență tehnică',
          hasTrailingIcon: true,
          hasLeadingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.WAY_TO_PAY:
        this.headerConfig = policySubpageHeader({
          title: 'Modalitate de plată',
          hasTrailingIcon: true,
          hasLeadingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.CALCULATION_LOADER:
        this.headerConfig = null;
        break;
      default:
        this.headerConfig = policySubpageHeader({
          title: 'Polita',
          backLink: false,
        });
        break;
    }
  }

  // Run operations in order on all step changes.
  changeStep(step: PolicyFormSteps) {
    this.bgWhite = false;
    this.currentStep = step;
    this.setTitles();
    this.setBgColor();
    this.cdRef.markForCheck();
  }

  /**
   * Handles the back button action.
   * @param forceChange - Specific event will force a step navigation.
   */
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
      case this.policySteps.CESIUNE_FORM:
        this.changeStep(this.policySteps.ADDRESS_SELECT);
        break;
      case this.policySteps.PERIOD_FORM:
        this.changeStep(this.policySteps.CESIUNE_FORM);
        break;
      case this.policySteps.POLICY_VERIFY:
        this.changeStep(this.policySteps.PERIOD_FORM);
        break;
      case this.policySteps.ADDRESS_FORM:
      case this.policySteps.LOCATION_FORM:
      case this.policySteps.PAD_CHECK:
        if (forceChange) {
          this.changeStep(this.policySteps.ADDRESS_SELECT);
        } else {
          this.navigateBackForm();
        }

        break;
      default:
        break;
    }
  }

  // Next step.
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
      case this.policySteps.ADDRESS_SELECT:
      case this.policySteps.ADDRESS_FORM:
      case this.policySteps.PAD_CHECK:
      case this.policySteps.LOCATION_FORM:
        this.loadLocuinte();
        this.changeStep(this.policySteps.CESIUNE_FORM);
        break;
      case this.policySteps.CESIUNE_FORM:
        this.changeStep(this.policySteps.PERIOD_FORM);
        break;
      case this.policySteps.PERIOD_FORM:
        this.offerData = this.policyFs.buildOfferItem({
          locuintaItem: this.selectedAddressItem,
          account: this.userAccount,
          pType: this.typeItem as PolicyType,
          cesiune: get(this.cesiuneData, 'cesionar', []),
          fromDate: this.periodStartData,
        });
        this.changeStep(this.policySteps.POLICY_VERIFY);
        break;
      default:
        break;
    }
  }

  /**
   * Change BG color depending on the viewed step.
   * @param forceWhite - We may want to force color on sub-steps.
   */
  setBgColor(forceWhite = null) {
    this.bgWhite = false;
    switch (this.currentStep) {
      case this.policySteps.DNT:
        this.bgWhite = false;
        break;
      case this.policySteps.INFO_DOC:
      case this.policySteps.ADDRESS_SELECT:
      case this.policySteps.ADDRESS_FORM:
      case this.policySteps.PAD_CHECK:
      case this.policySteps.LOCATION_FORM:
      case this.policySteps.CESIUNE_FORM:
      case this.policySteps.PERIOD_FORM:
      case this.policySteps.POLICY_VERIFY:
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

  /**
   * Subscribes to DNT component events.
   * @param event - Custom event naming.
   */
  dntEvents(event: string | number) {
    this.dntItem = event;
    if (event === 'success-btn') {
      this.dntItem = 'success';
      this.next();
    }
    if (event === 'cancel-ev') {
      this.dntItem = 'cancel-ev';
    }
    if (event === 'cancel-btn' || event === -1) {
      this.exitFlow();
    }
  }

  /**
   * Subscribes to Exclusion component navigation events
   * @param event - Custom event string.
   */
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
    this.setTitles();
  }

  /**
   * Subscribes to the address select component emitter.
   * @param type  - Emitted value.
   *
   * Will change step after selection.
   */
  addressSelect(type: string | PolicyLocuintaListItem) {
    if (type === 'ADD_NEW') {
      switch (this.policyID) {
        case 'AMPLUS':
          this.changeStep(this.policySteps.CESIUNE_FORM);
          break;
        case 'PAD':
          this.changeStep(this.policySteps.ADDRESS_FORM);
          break;
        case 'Garant AMPLUS+ PAD':
          break;
        default:
          break;
      }

      this.cdRef.markForCheck();
    } else if (type) {
      this.refreshPostAddressSelect(type as PolicyLocuintaListItem);
      this.selectedAddressItem = type as PolicyLocuintaListItem;
      this.setMinDate(get(this.selectedAddressItem, 'policy', null));
      this.next();
    }
  }

  /**
   * Subscribes to the form component step emitter.
   * @param step - Form step.
   *
   * Will change steps depending on the emitted value.
   */
  addressStepChange(step) {
    switch (step) {
      case LocuinteFormType.ADDRESS:
        this.changeStep(this.policySteps.ADDRESS_FORM);
        break;
      case LocuinteFormType.PAD_CHECK:
        this.changeStep(this.policySteps.PAD_CHECK);
        break;
      case LocuinteFormType.PLACE:
        this.changeStep(this.policySteps.LOCATION_FORM);
        break;
      case 'NEXT':
        this.next();
        break;
      case 'BACK':
        this.back(true);
        break;

      default:
        break;
    }
  }

  cesiuneSubmit(cesiuneData) {
    this.cesiuneData = cesiuneData;
    if (this.policyID == 'AMPLUS') {
      this.changeStep(this.policySteps.PERIOD_FORM);
      return;
    }
    this.next();
  }

  periodSubmit(startDate) {
    this.periodStartData = startDate;
    if (this.policyID == 'AMPLUS') {
      this.changeStep(this.policySteps.TECHNICAL_SUPPORT);
      return;
    }
    this.next();
  }

  navigateBackDnt() {
    if (this.dntComp) {
      this.dntComp.navigateInList('back', this.dntItem);
    }
  }

  navigateBackForm() {
    if (this.addressFormComp) {
      this.addressFormComp.navigateBack();
    }
  }
  navigateBackExclusion() {
    if (this.exclusionComp) {
      this.exclusionComp.navigateInList('back', this.exclusionItem);
    }
  }

  locuintaAdded(newVal: PolicyLocuintaListItem) {
    this.refreshPostAddressSelect(newVal);
    this.selectedAddressItem = newVal;
    this.setMinDate(get(newVal, 'policy', null));
    this.cdRef.markForCheck();
  }

  refreshPostAddressSelect(newVal) {
    if (
      get(newVal, 'locuinta.id', -1) !==
      get(this.selectedAddressItem, 'locuinta.id', null)
    ) {
      this.cesiuneData = null;
      this.periodStartData = null;
    }
  }

  setMinDate(policy: PolicyItem) {
    if (!policy) {
      this.minPeriodStartDate = null;
    } else {
      this.minPeriodStartDate = get(policy, 'dates.to', null);
    }
    this.maxPeriodStartDate = null;
    if (this.minPeriodStartDate) {
      const initV = Date.parse(this.minPeriodStartDate);

      if (initV && !isNaN(initV)) {
        this.maxPeriodStartDate = new Date(
          new Date(initV).setFullYear(new Date(initV).getFullYear() + 1)
        ).toISOString();
      } else {
        this.maxPeriodStartDate = new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toISOString();
      }
    } else {
      this.minPeriodStartDate = new Date();
      this.maxPeriodStartDate = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString();
    }
  }

  techSupportSubmit(supportData) {
    this.changeStep(this.policySteps.WAY_TO_PAY);
  }

  paySubmit(payData) {
    this.offerData = this.policyFs.buildOfferItem({
      locuintaItem: this.selectedAddressItem,
      account: this.userAccount,
      pType: this.typeItem as PolicyType,
      cesiune: get(this.cesiuneData, 'cesionar', []),
      fromDate: this.periodStartData,
    });
    this.changeStep(this.policySteps.POLICY_VERIFY);
  }

  calculationSubmit() {
    this.changeStep(this.policySteps.CALCULATION_LOADER);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        policyType: this.policyID,
      },
    };
    this.reftime = setTimeout(() => {
      this.navCtrl.navigateForward(['/policy', 'offer', 2], navigationExtras);
    }, 3000);
  }

  exitFlow() {
    this.navCtrl.navigateBack(['/policy']);
  }

  ngOnDestroy(): void {
    this.dntItem = null;
    clearTimeout(this.reftime);
  }
}
