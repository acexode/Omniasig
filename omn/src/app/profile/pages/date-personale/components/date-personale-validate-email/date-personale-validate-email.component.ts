import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  isPlatform,
  ModalController,
  NavController,
} from '@ionic/angular';
import { get, has } from 'lodash';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { CustomTimersService } from 'src/app/core/services/custom-timers/custom-timers.service';
import { GeneralMessageModalComponent } from 'src/app/shared/components/general-message-modal/general-message-modal.component';
import { EmailValidateModes } from 'src/app/shared/models/modes/email-validate-modes';
import { OmnAppLauncherService } from 'src/app/shared/modules/omn-app-launcher/services/omn-app-launcher.service';
import { unsubscriberHelper } from './../../../../../core/helpers/unsubscriber.helper';

@Component({
  selector: 'app-date-personale-validate-email',
  templateUrl: './date-personale-validate-email.component.html',
  styleUrls: ['./date-personale-validate-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePersonaleValidateEmailComponent implements OnInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  validateEmailModes = EmailValidateModes;
  defaultDisplayMode = this.validateEmailModes.EMAIL_NEW_VALIDATE;
  displayMode: EmailValidateModes = null;
  email = '';
  loaded = false;
  timerSubs: Subscription;
  timer$ = new BehaviorSubject(0);
  queryParams = null;
  init = false;
  navS;

  constructor(
    public actionSheetController: ActionSheetController,
    private appS: OmnAppLauncherService,
    private routerS: CustomRouterService,
    private authS: AuthService,
    private aRoute: ActivatedRoute,
    private navCtrl: NavController,
    private timerS: CustomTimersService,
    private cdRef: ChangeDetectorRef,
    private modalController: ModalController
  ) {
    this.subscribeTimer();
  }

  subscribeTimer() {
    if (this.timerSubs) {
      this.timerSubs.unsubscribe();
    }
    this.timerSubs = this.timerS.emailValidateTimer$.subscribe((v) =>
      this.timer$.next(v)
    );
  }

  ngOnInit() {
    this.navS = this.routerS
      .getNavigationEndEvent()
      .pipe(
        switchMap((val) => {
          return combineLatest([
            this.routerS.processChildDataAsync(this.aRoute, 'validateMode'),
            this.authS.getAccountData().pipe(take(1)),
            this.routerS.processChildQParamsAsync(this.aRoute, [
              'UserNameOrId',
              'ConfirmationToken',
              'RawProperties',
              'resendEmail',
            ]),
          ]);
        })
      )
      .subscribe((vM) => {
        if (vM) {
          this.displayMode = get(vM, '0', this.defaultDisplayMode);
          this.email = get(vM, '1.newEmail', this.email);
          if (!this.email) {
            this.email = get(vM, '1.email', this.email);
          }
          this.queryParams = get(vM, '2', null);
        }
        if (!this.init) {
          const resendValidation = get(this.queryParams, 'resendEmail', false);
          this.handleEventData(resendValidation);
          this.init = true;
        }
        this.cdRef.markForCheck();
      });
  }

  async openVerifyModal() {
    if (isPlatform('android')) {
      return (
        await this.createErrorModal(
          'Email trimis',
          'Te rugam deschide clientul de email folosit.',
          'info'
        )
      ).present();
    }
    let actionSheet = null;
    this.actionSheetController
      .create({
        header: 'Verific?? inbox',
        buttons: [
          {
            text: 'Deschide e-mail',
            cssClass:
              'm-0 w-100 no-shadow ion-color text-weight-medium ion-color-success flat button button-block button-large button-solid',
            handler: () => {
              this.tryApp();
            },
          },
          {
            text: 'Renun????',
            role: 'cancel',
            handler: () => {
              this.tryApp(1);
            },
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

  async tryApp(type = 0) {
    const errModal = await this.createErrorModal(
      'Nu am putut deschide clientul de email.',
      'Te rugam deschide clientul de email folosit.',
      'error'
    );
    if (type) {
      // Do nothing in this case.
    } else {
      this.appS.tryEmailRead().subscribe(
        () => {},
        (err) => {
          if (errModal) {
            errModal.present();
          }
        }
      );
    }
  }

  toggleSuccess() {
    if (this.displayMode === this.validateEmailModes.EMAIL_NEW_VALIDATE) {
      this.displayMode = this.validateEmailModes.EMAIL_NEW_VALIDATE_SUCCESS;
    }
    if (this.displayMode === this.validateEmailModes.EMAIL_CHANGE_VALIDATE) {
      this.displayMode = this.validateEmailModes.EMAIL_CHANGE_VALIDATE_SUCCESS;
    }
    this.cdRef.markForCheck();
  }

  resendEmail() {
    this.timerS.startEmailValidateTimer();
    this.subscribeTimer();
    this.authS.doChangeEmail(this.email).subscribe();
    this.cdRef.markForCheck();
  }

  continueValidate() {
    this.cancelValidate();
  }

  cancelValidate() {
    if (
      this.displayMode === this.validateEmailModes.EMAIL_CHANGE_VALIDATE ||
      this.displayMode === this.validateEmailModes.EMAIL_CHANGE_VALIDATE_SUCCESS
    ) {
      this.navCtrl.navigateBack('/profil/date-personale');
    } else {
      this.navCtrl.navigateBack('/home');
    }
  }

  handleEventData(resubmit = false) {
    switch (this.displayMode) {
      case this.validateEmailModes.EMAIL_CODE_PROCESSING:
        // We trigger the token validation process.
        if (this.queryParams && has(this.queryParams, 'RawProperties')) {
          this.validateEmailToken(true);
        } else {
          this.displayMode = this.validateEmailModes.EMAIL_VALIDATE_ERROR;
          this.cdRef.markForCheck();
        }
        break;
      case this.validateEmailModes.EMAIL_CODE_CHANGE_PROCESSING:
        // We trigger the token validation process.
        if (this.queryParams && has(this.queryParams, 'RawProperties')) {
          this.validateEmailToken(false);
        } else {
          this.displayMode = this.validateEmailModes.EMAIL_VALIDATE_ERROR;
          this.cdRef.markForCheck();
        }
        break;

      case this.validateEmailModes.EMAIL_NEW_VALIDATE:
        // We trigger resending the token.
        if (!this.timer$.value && resubmit) {
          this.authS.doReqNewEmailCode().subscribe();
          if (!this.timerS.emailValidateTimer$.value) {
            this.timerS.startEmailValidateTimer();
          }
        }
        break;

      default:
        break;
    }
  }

  /**
   * This passes the token and user id data to the validation WS.
   * @param newE - Required to decide which WS to use to validate.
   */
  validateEmailToken(newE = false) {
    const RawProperties = get(this.queryParams, 'RawProperties', null);

    let jsonObj = {};
    try {
      jsonObj = JSON.parse(atob(RawProperties));
    } catch (err) {
      jsonObj = {};
    }
    this.authS.validateEmail(jsonObj, newE).subscribe(
      (sData) => {
        this.displayMode =
          this.displayMode === this.validateEmailModes.EMAIL_CODE_PROCESSING
            ? this.validateEmailModes.EMAIL_NEW_VALIDATE_SUCCESS
            : this.validateEmailModes.EMAIL_CHANGE_VALIDATE_SUCCESS;
        this.cdRef.markForCheck();
        this.cdRef.detectChanges();
      },
      (err) => {
        this.displayMode = this.validateEmailModes.EMAIL_VALIDATE_ERROR;
        this.cdRef.markForCheck();
        this.cdRef.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.init = false;
    unsubscriberHelper(this.timerSubs);
    unsubscriberHelper(this.navS);
  }

  async createErrorModal(
    title = '',
    description = '',
    alertType: 'error' | 'info' = 'info'
  ) {
    return this.modalController.create({
      component: GeneralMessageModalComponent,
      cssClass: 'my-custom-modal-class disabled-message-modal-class',
      componentProps: {
        title,
        description,
        alertType,
      },
    });
  }
}
