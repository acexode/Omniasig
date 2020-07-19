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
import { get } from 'lodash';
import { BehaviorSubject, Subscription, zip, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { CustomTimersService } from 'src/app/core/services/custom-timers/custom-timers.service';
import { EmailValidateModes } from 'src/app/shared/models/modes/email-validate-modes';
import { OmnAppLauncherService } from 'src/app/shared/modules/omn-app-launcher/services/omn-app-launcher.service';

@Component({
  selector: 'app-date-personale-validate-email',
  templateUrl: './date-personale-validate-email.component.html',
  styleUrls: ['./date-personale-validate-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePersonaleValidateEmailComponent implements OnInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  validateEmailModes = EmailValidateModes;
  displayMode: EmailValidateModes = this.validateEmailModes.EMAIL_NEW_VALIDATE;
  email = '';
  loaded = false;
  timerSubs: Subscription;
  timer$ = new BehaviorSubject(0);

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
    this.routerS
      .getNavigationEndEvent()
      .pipe(
        switchMap(() => {
          return zip(
            this.routerS.processChildDataAsync(this.aRoute, 'validateMode'),
            this.authS.getAccountData()
          );
        })
      )
      .subscribe((vM) => {
        if (vM) {
          this.displayMode = get(vM, '0.validateMode', this.displayMode);
          this.email = get(vM, '1.email', this.email);
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
      this.toggleSuccess();
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
    this.authS.demoActivate();
  }

  getEmail() {
    this.timerS.startEmailValidateTimer();
    this.subscribeTimer();
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
      this.navCtrl.navigateBack('/profil/date-personale/validate-email');
    } else {
      this.navCtrl.navigateBack('/home');
    }
  }

  ngOnDestroy() {
    if (this.timerSubs) {
      this.timerSubs.unsubscribe();
    }
  }
}
