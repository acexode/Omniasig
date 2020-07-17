import {
  Component,
  HostBinding,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { get } from 'lodash';
import { BehaviorSubject, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { CustomTimersService } from 'src/app/core/services/custom-timers.service';
import { EmailValidateModes } from 'src/app/shared/models/modes/email-validate-modes';
import { OmnAppLauncherService } from 'src/app/shared/modules/omn-app-launcher/services/omn-app-launcher.service';

@Component({
  selector: 'app-date-personale-validate-email',
  templateUrl: './date-personale-validate-email.component.html',
  styleUrls: ['./date-personale-validate-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePersonaleValidateEmailComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  displayMode = EmailValidateModes;
  validateEmailModes: EmailValidateModes = this.displayMode.EMAIL_NEW_VALIDATE;
  email = '';
  loaded = false;
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
    this.timerS.startEmailValidateTimer();
  }

  subscribeTimer() {
    this.timerS.emailValidateTimer$.subscribe((v) => this.timer$.next(v));
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
          console.log(vM);
          this.validateEmailModes = get(
            vM,
            '0.validateMode',
            this.validateEmailModes
          );
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
              'm-0 w-100 no-shadow ion-color text-weight-medium ion-color-success button button-block button-large button-solid',
            handler: () => {
              this.tryApp();
            },
          },
          {
            text: 'Renunță',
            role: 'cancel',
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

  tryApp() {
    this.appS.tryEmailRead().subscribe((v) => console.log(v));
  }

  cancelValidate() {
    if (this.validateEmailModes === this.displayMode.EMAIL_CHANGE_VALIDATE) {
      this.navCtrl.navigateBack('/profil/date-personale/validate-email');
    } else {
      this.navCtrl.navigateBack('/home');
    }
  }
}
