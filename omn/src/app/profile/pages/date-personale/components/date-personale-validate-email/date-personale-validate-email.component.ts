import { take } from 'rxjs/internal/operators/take';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { get, has } from 'lodash';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { CustomTimersService } from 'src/app/core/services/custom-timers/custom-timers.service';
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
    private cdRef: ChangeDetectorRef
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
    if (!this.timerS.emailValidateTimer$.value) {
      this.timerS.startEmailValidateTimer();
    }
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
            ]),
          ]);
        })
      )
      .subscribe((vM) => {
        if (vM) {
          this.displayMode = get(vM, '0', this.defaultDisplayMode);
          this.email = get(vM, '1.email', this.email);
          this.queryParams = get(vM, '2', null);
        }
        
        if (!this.init) {
          this.handleEventData();
          this.init = true;
        }
        this.cdRef.markForCheck();
      });
  }

  async openVerifyModal() {
    let actionSheet = null;
    this.actionSheetController
      .create({
        header: 'Verifică inbox',
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
            text: 'Renunță',
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

  tryApp(type = 0) {
    if (type) {
      // Do nothing in this case.
    } else {
      this.appS.tryEmailRead().subscribe((v) => console.log(v));
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

  handleEventData() {
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
        this.authS.doReqNewEmailCode().subscribe();
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
}
