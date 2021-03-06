import { dateHelperDMY } from './../../../../core/helpers/date.helper';
import { PadService } from './../../services/pad.service';
import { AmplusService } from './../../services/amplus.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { get, has } from 'lodash';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { PolicyType } from 'src/app/shared/models/data/policy-type';
import { policyTypes } from 'src/app/shared/models/data/policy-types';
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
  @ViewChild(IonContent, { static: false }) content: IonContent;

  @HostBinding('class')
  get color() {
    return this.bgWhite ? 'ion-color-white-page' : null;
  }
  loaderTitle = 'Calcul??m costul poli??ei de asigurare???';

  bgWhite = false;
  headerConfig;
  policySteps = PolicyFormSteps;
  currentStep = PolicyFormSteps.DNT;
  typeItem;
  showError = false;

  policyLocuintaData$: BehaviorSubject<
    Array<PolicyLocuintaListItem>
  > = new BehaviorSubject([]);
  dntItem: any = null;
  exclusionItem: any = null;
  locuintaFormType: LocuinteFormType = LocuinteFormType.ADDRESS;

  // Stored Data:
  selectedAddressItem: PolicyLocuintaListItem;
  preselectedAddressItem: PolicyLocuintaListItem;
  cesiuneData;
  periodStartData;
  userAccount: Account;
  wayPayFormData;
  assistFormData;
  minPeriodStartDate;
  maxPeriodStartDate;
  // This will contain all data needed for an offer.
  offerData: PolicyOffer = null;
  locuinteData = null;
  policyID;
  reftime;
  formCheckType: LocuinteFormType;

  // Errors.
  defaultErrMsg: Array<IonTextItem> = [
    {
      classes: 'ion-text-center',
      text:
        'Ceva nu a func??ionat corect. Vei fi redirec??ionat spre pagina anterioara.',
    },
  ];
  errMsg;
  errTitle;
  constructor(
    private routerS: CustomRouterService,
    private aRoute: ActivatedRoute,
    private authS: AuthService,
    private policyD: PolicyDataService,
    private amplusS: AmplusService,
    private padS: PadService,
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
        const locuintaId = this.aRoute.snapshot.queryParamMap.get('id');
        switch (this.policyID) {
          case 'AMPLUS':
            this.typeItem = policyTypes.AMPLUS;
            break;
          case 'PAD':
            this.typeItem = policyTypes.PAD;
            break;
          case 'Garant AMPLUS + PAD':
            this.typeItem = policyTypes.AMPLUS_PAD;
            break;
          default:
            break;
        }

        this.loadLocuinte(locuintaId);
        this.changeStep(vals[0]);
      });
  }

  loadUserAccount() {
    this.authS.getAccountData().subscribe((acc) => (this.userAccount = acc));
  }

  // Load Address + policy combination data. Used in the address picker.
  loadLocuinte(preselectedId = null) {
    this.locS.loadAllData();
    this.locS.locuinteStore$.subscribe((vals) => {
      this.policyLocuintaData$.next(
        this.policyFs.buildPolicyLocuintaModel(vals, this.typeItem.id)
      );
      const pAddrId = this.preselectedAddressItem
        ? get(this.preselectedAddressItem, 'locuinta.id', null)
        : null;
      const sAddrId = this.selectedAddressItem
        ? get(this.selectedAddressItem, 'locuinta.id', null)
        : null;
      let preselectedChanged = false;
      if (pAddrId === null && sAddrId === null) {
        preselectedChanged = false;
      } else {
        try {
          preselectedChanged = pAddrId.toString() !== sAddrId.toString();
        } catch (err) {
          preselectedChanged = false;
        }
      }
      const presId = preselectedId
        ? preselectedId
        : get(this.preselectedAddressItem, 'locuinta.id', null);
      if (presId) {
        // Look for preselected item via address id.
        const presAddrItemIndex = this.policyLocuintaData$.value.findIndex(
          (plv) => {
            try {
              return (
                get(plv, 'locuinta.id', null).toString() === presId.toString()
              );
            } catch (err) {
              return false;
            }
          }
        );

        if (presAddrItemIndex > -1) {
          this.preselectedAddressItem = this.policyLocuintaData$.value[
            presAddrItemIndex
          ];
          // Move it as first item.
          this.policyLocuintaData$.value.splice(presAddrItemIndex, 1);
          const newIt = [this.preselectedAddressItem].concat(
            this.policyLocuintaData$.value
          );
          // Preselect item.
          if (!preselectedChanged) {
            this.selectedAddressItem = { ...this.preselectedAddressItem };
          }
          this.policyLocuintaData$.next(newIt);
        } else {
          this.preselectedAddressItem = null;
        }
      }
    });
  }

  /**
   * Switch titles depending on steps.
   */
  setTitles() {
    switch (this.currentStep) {
      case this.policySteps.DNT:
        this.headerConfig = policySubpageHeader({
          title: 'Formular de analiz??',
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
            title: 'Condi??ii de excludere',
            backLink: false,
            hasTrailingIcon: true,
            hasLeadingIcon: true,
          });
        }
        break;
      case this.policySteps.INFO_DOC:
        const step = get(this.infoDocComp, 'currentStep', 0);
        this.headerConfig = policySubpageHeader({
          title: 'Document de Informare',
          backLink: false,
          hasLeadingIcon: step > 1,
          hasTrailingIcon: true,
        });
        break;
      case this.policySteps.ADDRESS_SELECT:
        this.headerConfig = policySubpageHeader({
          title: 'Adres?? locuin????',

          hasLeadingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.ADDRESS_FORM:
        this.headerConfig = policySubpageHeader({
          title: 'Adres?? nou??',
          hasTrailingIcon: true,
          hasLeadingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.LOCATION_FORM:
        this.headerConfig = policySubpageHeader({
          title: 'Informa??ii locuin????',
          hasTrailingIcon: true,
          hasLeadingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.PAD_CHECK:
      case this.policySteps.POLICY_VERIFY_CHECK:
        this.headerConfig = policySubpageHeader({
          title: 'Verificare',
          hasTrailingIcon: false,
          hasLeadingIcon: false,
          backLink: false,
        });
        break;
      case this.policySteps.CESIUNE_FORM:
        this.headerConfig = policySubpageHeader({
          title: 'Ipotec??',
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
          title: 'Asisten???? tehnic??',
          hasTrailingIcon: true,
          hasLeadingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.WAY_TO_PAY:
        this.headerConfig = policySubpageHeader({
          title: 'Modalitate de plat??',
          hasTrailingIcon: true,
          hasLeadingIcon: true,
          backLink: false,
        });
        break;
      case this.policySteps.OFFER_EMIT_CHECK:
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
    this.showError = false;
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
        const step = get(this.infoDocComp, 'currentStep', 0);
        if (this.policyID === 'Garant AMPLUS + PAD' && step > 1) {
          this.infoDocComp.back();
          return;
        } else if (has(this.typeItem, 'dntConfig', null)) {
          this.typeItem.dntConfig = {
            ...this.typeItem.dntConfig,
            ...{ initialStep: this.dntItem },
          };
        }
        this.changeStep(this.policySteps.DNT);
        break;
      case this.policySteps.ADDRESS_SELECT:
        if (forceChange) {
          this.changeStep(this.policySteps.ADDRESS_SELECT);
        } else {
          this.changeStep(this.policySteps.EXCLUSION);
        }
        break;
      case this.policySteps.CESIUNE_FORM:
        this.changeStep(this.policySteps.ADDRESS_SELECT);
        break;
      case this.policySteps.PERIOD_FORM:
        this.changeStep(this.policySteps.CESIUNE_FORM);
        break;
      case this.policySteps.POLICY_VERIFY:
        if (this.policyID === 'PAD') {
          this.changeStep(this.policySteps.PERIOD_FORM);
        } else {
          this.changeStep(this.policySteps.WAY_TO_PAY);
        }

        break;
      case this.policySteps.LOCATION_FORM:
      case this.policySteps.PAD_CHECK:
        if (forceChange) {
          this.changeStep(this.policySteps.ADDRESS_SELECT);
        }
        this.navigateBackForm();
        break;
      case this.policySteps.ADDRESS_FORM:
        this.changeStep(this.policySteps.ADDRESS_SELECT);
        break;
      case this.policySteps.TECHNICAL_SUPPORT:
        this.changeStep(this.policySteps.PERIOD_FORM);
        break;
      case this.policySteps.WAY_TO_PAY:
        this.changeStep(this.policySteps.TECHNICAL_SUPPORT);
        break;
      case this.policySteps.OFFER_EMIT_CHECK:
        this.changeStep(this.policySteps.POLICY_VERIFY);
        break;
      case this.policySteps.POLICY_VERIFY_CHECK:
        if (this.policyID === 'PAD') {
          this.changeStep(this.policySteps.PERIOD_FORM);
        } else {
          this.changeStep(this.policySteps.WAY_TO_PAY);
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
          payData: this.wayPayFormData,
          supportData: this.assistFormData,
        });
        this.changeStep(this.policySteps.POLICY_VERIFY);
        break;
      default:
        break;
    }
  }

  processErrorMessage(error, key) {
    const eroare = get(error, key + '.eroare', false);
    const mesaj = get(error, key + '.mesaj', '');
    if (eroare && mesaj) {
      this.handleError(mesaj);
    } else {
      this.handleError(error);
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
      case this.policySteps.TECHNICAL_SUPPORT:
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
      case this.policySteps.WAY_TO_PAY:
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
    this.offerData = this.policyFs.buildOfferItem({
      locuintaItem: this.selectedAddressItem,
      account: this.userAccount,
      pType: this.typeItem as PolicyType,
      cesiune: get(this.cesiuneData, 'cesionar', []),
      fromDate: this.periodStartData,
      payData: this.wayPayFormData,
      supportData: this.assistFormData,
    });
    if (type === 'ADD_NEW') {
      this.locuinteData = null;
      this.changeStep(this.policySteps.ADDRESS_FORM);
      this.cdRef.markForCheck();
    } else if (type) {
      const locuinta = get(type, 'locuinta', {});

      if (this.policyFs.checkEmptyLocuintaItems(locuinta)) {
        this.locuinteData = locuinta;
        this.changeStep(this.policySteps.LOCATION_FORM);
      } else {
        this.refreshPostAddressSelect(type as PolicyLocuintaListItem);
        this.selectedAddressItem = type as PolicyLocuintaListItem;
        this.setMinDate(get(this.selectedAddressItem, 'policy', null));
        switch (this.policyID) {
          case 'PAD':
            this.next();
            break;
          default:
            this.changeStep(this.policySteps.CESIUNE_FORM);
            break;
        }
      }
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
      case 'TO_POLICY_VERIFY':
        this.changeStep(this.policySteps.POLICY_VERIFY);
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
    if (this.policyID === 'AMPLUS') {
      this.changeStep(this.policySteps.PERIOD_FORM);
      return;
    }
    this.next();
  }

  buildOfferDetails() {
    return this.policyFs.buildOfferItem({
      locuintaItem: this.selectedAddressItem,
      account: this.userAccount,
      pType: this.typeItem as PolicyType,
      cesiune: get(this.cesiuneData, 'cesionar', []),
      fromDate: this.periodStartData,
      payData: this.wayPayFormData,
      supportData: this.assistFormData,
    });
  }

  periodSubmit(startDate) {
    this.periodStartData = startDate;
    if (this.policyID === 'PAD') {
      this.offerData = this.buildOfferDetails();
      this.loaderTitle = 'Verific??m corectitudinea datelor???';
      if (this.policyID === 'PAD') {
        this.changeStep(this.policySteps.POLICY_VERIFY_CHECK);
      }
      // checks if offer can be created before going to the verify page
      this.padS
        .CreatePADInsuranceOffer(
          this.offerData.policy.locuintaData.id,
          this.offerData.policy.dates.from,
          false
        )
        .subscribe(
          (result) => {
            if (result) {
              if (this.policyID === 'Garant AMPLUS + PAD') {
                this.changeStep(this.policySteps.TECHNICAL_SUPPORT);
              } else {
                this.changeStep(this.policySteps.POLICY_VERIFY);
              }
            } else {
              this.handleError(null);
            }
          },
          (err) => {
            this.processErrorMessage(err.error, 'emitereOfertaResponse1');
          }
        );
      return;
    } else {
      this.changeStep(this.policySteps.TECHNICAL_SUPPORT);
    }
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
    this.maxPeriodStartDate = null;
    if (!policy) {
      this.minPeriodStartDate = null;
    } else if (
      this.policyID === 'PAD' ||
      this.policyID === 'Garant AMPLUS + PAD'
    ) {
      try {
        this.minPeriodStartDate = get(policy, 'dates.to', null);
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
      } catch (e) {}
    } else {
      try {
        this.minPeriodStartDate = new Date().setDate(new Date().getDate() + 1);
        const maxD = Date.parse(get(policy, 'dates.to', null));
        this.maxPeriodStartDate = maxD
          ? new Date(maxD).toISOString()
          : new Date(this.minPeriodStartDate).setFullYear(
              new Date(this.minPeriodStartDate).getFullYear() + 1
            );
      } catch (e) {}
    }
    if (!this.minPeriodStartDate) {
      this.minPeriodStartDate = new Date().setDate(new Date().getDate() + 1);
    }
    if (!this.maxPeriodStartDate) {
      this.maxPeriodStartDate = new Date(this.minPeriodStartDate).setFullYear(
        new Date(this.minPeriodStartDate).getFullYear() + 1
      );
    }
  }

  techSupportSubmit(supportData) {
    this.assistFormData = supportData;
    this.offerData = this.policyFs.buildOfferItem({
      locuintaItem: this.selectedAddressItem,
      account: this.userAccount,
      pType: this.typeItem as PolicyType,
      cesiune: get(this.cesiuneData, 'cesionar', []),
      fromDate: this.periodStartData,
      payData: this.wayPayFormData,
      supportData: this.assistFormData,
    });
    this.changeStep(this.policySteps.WAY_TO_PAY);
  }

  paySubmit(payData) {
    this.wayPayFormData = payData;
    this.offerData = this.buildOfferDetails();
    this.loaderTitle = 'Verific??m corectitudinea datelor???';
    this.changeStep(this.policySteps.POLICY_VERIFY_CHECK);
    // checks if offer can be created before going to the verify page
    if (this.policyID === 'AMPLUS') {
      const payload = {
        isVip: this.offerData?.supportData?.plan === 'vip' ? true : false,
        isGold: this.offerData?.supportData?.plan === 'gold' ? true : false,
        mentiuni: 'self',
        startDate: this.offerData?.policy?.dates?.from,
        // startDate: "2020-10-10",
        numberOfMonths: '12',
        insurancePrice: get(
          this.offerData?.policy?.locuintaData,
          'value',
          100000
        ),
        numberOfPayments: this.offerData?.payData?.rate,
        paymentCurrency: this.offerData?.payData?.type || 'RON',
        propertyCessionList: null,
      };
      this.amplusS
        .CreateAmplusInsuranceOffer(
          this.offerData.policy.locuintaData.id,
          false,
          payload
        )
        .subscribe(
          (result) => {
            if (result) {
              this.changeStep(this.policySteps.POLICY_VERIFY);
            } else {
              this.handleError(null);
            }
          },
          (err) => {
            this.processErrorMessage(err.error, 'ofertaResponse');
          }
        );
      return;
    } else {
      this.changeStep(this.policySteps.POLICY_VERIFY);
    }
  }

  calculationSubmit() {
    this.changeStep(this.policySteps.OFFER_EMIT_CHECK);
  }

  scrollToTop() {
    this.content.scrollToTop(1500);
  }

  handleError(data) {
    this.headerConfig = null;
    if (
      (this.policyID === 'AMPLUS' || this.policyID === 'Garant AMPLUS + PAD') &&
      this.currentStep !== this.policySteps.POLICY_VERIFY_CHECK &&
      this.currentStep !== this.policySteps.OFFER_EMIT_CHECK
    ) {
      this.errTitle = {
        text: 'Lips?? poli???? PAD',
        class: 'color-red',
      };
      this.errMsg = [
        {
          classes: 'ion-text-center',
          text:
            'Nu am g??sit o poli???? PAD valabil?? pentru aceast?? adres??. ' +
            'Conform legisla??iei din Rom??nia, pentru a putea cump??ra o poli???? de asigurare faculativ??,' +
            ' locuin??a trebuie s?? fie asigurat?? obligatoriu prin poli??a PAD.',
        },
      ];
    } else {
      this.errTitle = {
        text: 'Ne pare r??u...',
        class: 'color-red',
      };
      if (typeof data === 'string') {
        this.errMsg = [
          {
            classes: 'ion-text-center',
            text:
              'Ceva nu a func??ionat corect. Vei fi redirec??ionat spre pagina anterioara.',
          },
          {
            classes: 'ion-text-center mt-8',
            text: 'Mesaj eroare: ' + data,
          },
        ];
      } else if (typeof data === 'object') {
        this.errMsg = [];
        if (data.hasPaid && data.paidExpireDate) {
          let date = data.paidExpireDate;
          try {
            date = dateHelperDMY(new Date(data.paidExpireDate));
          } catch (e) {
            date = data.paidExpireDate;
          }
          this.errMsg.push({
            classes: 'ion-text-center w-100 mb-16',
            text:
              'Locuin??a pe care dore??ti s?? o asiguri are deja o ' +
              'asigurare PAD activ?? ??n ' +
              date +
              '. Po??i s?? ????i re-??nnoie??ti poli???? PAD c??nd au r??mas ' +
              'mai pu??in de 30 de zile din valabilitate.',
          });
        }
        if (data.dateOfBirthCheckPassed === false) {
          this.errMsg.push({
            classes: 'ion-text-center w-100 mb-16',
            text:
              'Ceva nu a func??ionat corect. Va rugam sa verificati data de nastere.',
          });
        }
        if (data.startDatePassed === false) {
          this.errMsg.push({
            classes: 'ion-text-center w-100 mb-16',
            text: 'Data de start este invalida pentru acest tip de asigurare.',
          });
        }
        if (data.errorMessage && get(data.errorMessage, 'length', 0)) {
          data.errorMessage.forEach((v) => {
            this.errMsg.push({
              classes: 'ion-text-center w-100 mb-16',
              text: v,
            });
          });
        }
      } else {
        this.errMsg = this.defaultErrMsg;
      }
    }
    if (this.errMsg.length === 0) {
      this.errMsg = this.defaultErrMsg;
    }
    this.showError = true;
    this.cdRef.markForCheck();
  }

  changeTitle() {
    this.headerConfig = policySubpageHeader({
      title: 'Verificare',
      hasTrailingIcon: false,
      hasLeadingIcon: false,
      backLink: false,
    });
  }

  exitFlow() {
    this.navCtrl.navigateBack(['/policy']);
  }

  ngOnDestroy(): void {
    this.dntItem = null;
    clearTimeout(this.reftime);
  }

  infoDocStep(step: number) {
    if (this.policyID === 'Garant AMPLUS + PAD') {
      this.setTitles();
    }
  }
}
