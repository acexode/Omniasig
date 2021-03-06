import { Account } from './../../../../../core/models/account.interface';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { get } from 'lodash';
import { BehaviorSubject, of, Subscription, throwError } from 'rxjs';
import { finalize, switchMap, take, tap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { CustomTimersService } from 'src/app/core/services/custom-timers/custom-timers.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { DatePersonaleFormModes } from 'src/app/shared/models/modes/date-personale-form-modes';
import { cnpValidator } from 'src/app/shared/validators/cnp-validator';
import { genericErrorTexts } from './../../../../../shared/data/generic-error-helper';

@Component({
  selector: 'app-date-personale-form',
  templateUrl: './date-personale-form.component.html',
  styleUrls: ['./date-personale-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePersonaleFormComponent implements OnInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  title = '';
  formModes = DatePersonaleFormModes;
  formMode = null;
  formGroup: FormGroup;
  headerConfig = null;
  timerSubs: Subscription;
  timer$ = new BehaviorSubject(0);
  formSubmitting = false;
  routeBackLink = '/profil/date-personale';
  errorPage = false;
  account;
  isGDPRokStatus = true;
  errorMsgs = [];
  constructor(
    private fb: FormBuilder,
    private authS: AuthService,
    private routerS: CustomRouterService,
    private aRoute: ActivatedRoute,
    private navCtrl: NavController,
    private cdRef: ChangeDetectorRef,
    private timerS: CustomTimersService
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
        this.setTitles();
        this.buildForm();
        this.cdRef.markForCheck();
      });
  }

  setTitles() {
    if (this.formMode === this.formModes.EDIT_EMAIL) {
      this.headerConfig = subPageHeaderDefault(
        'Schimbare adres?? e-mail',
        this.routeBackLink
      );
    }
    if (this.formMode === this.formModes.EDIT_CNP) {
      this.headerConfig = subPageHeaderDefault(
        'Introdu CNP',
        this.routeBackLink
      );
    }
  }

  buildForm() {
    this.authS
      .getAccountData()
      .pipe(take(1))
      .subscribe((acc: Account) => {
        this.account = acc;
        if (this.formMode === this.formModes.EDIT_EMAIL) {
          this.formGroup = this.fb.group({
            email: this.fb.control(acc && acc.email ? acc.email : '', [
              Validators.email,
              Validators.required,
            ]),
          });
          this.timerSubs = this.timerS.emailValidateTimer$.subscribe((v) =>
            this.timer$.next(v)
          );
        }
        if (this.formMode === this.formModes.EDIT_CNP) {
          this.formGroup = this.fb.group({
            cnp: this.fb.control(acc && acc.cnp ? acc.cnp : '', {
              validators: [
                Validators.required,
                Validators.minLength(13),
                Validators.pattern('[0-9]*'),
                Validators.maxLength(13),
                cnpValidator,
              ],
            }),
          });
        }
      });
  }
  submitForm() {
    if (this.formGroup.valid) {
      this.formSubmitting = true;
      if (this.formMode === this.formModes.EDIT_EMAIL) {
        this.authS
          .doChangeEmail(this.email.value)
          .pipe(
            finalize(() => {
              this.authS.doUpdateAccount({ newEmail: this.email.value });
              this.timerS.startEmailValidateTimer();
              this.navCtrl.navigateForward(
                this.formMode === this.formModes.EDIT_EMAIL
                  ? '/profil/date-personale/validate-email-change'
                  : '/profil/date-personale/validate-email'
              );
              this.formSubmitting = false;
            }),
            catchError((err) => {
              this.errorMsgs = genericErrorTexts(
                err
                  ? get(err, 'error', 'A fost identificat?? o problem??...')
                  : 'A fost identificat?? o problem??...',
                ''
              );
              this.errorPage = true;
              this.cdRef.detectChanges();
              return throwError(err);
            })
          )
          .subscribe();
      } else if (this.formMode === this.formModes.EDIT_CNP) {
        this.authS
          .getPhoneNumber()
          .pipe(
            switchMap((e) => {
              let obsv = of(true);
              try {
                if (this.cnp.value !== this.account.cnp) {
                  obsv = this.authS.checkCNP(this.cnp.value, e);
                }
              } catch {
                return throwError('');
              }

              return obsv.pipe(
                switchMap((res) => {
                  return this.authS.checkGDPR(this.cnp.value).pipe(
                    switchMap((isGDPRok) => {
                      this.isGDPRokStatus = get(
                        isGDPRok,
                        'isGDPRNotRestricted',
                        true
                      );
                      if (this.isGDPRokStatus) {
                        return of(null);
                      } else {
                        return throwError('falseGDPR');
                      }
                    })
                  );
                }),
                switchMap((v) => {
                  let user;
                  try {
                    user = {
                      userNameOrId: this.account.userId,
                      name: this.account.name,
                      cnp: this.cnp.value,
                      surname: this.account.surname,
                    };
                  } catch {
                    return throwError('');
                  }
                  if (user) {
                    return this.authS.updateUserProfile(user);
                  }
                  return throwError('');
                }),
                tap(() => {
                  this.authS.doUpdateAccount({ cnp: this.cnp.value });
                })
              );
            })
          )
          .subscribe(
            () => {
              this.navCtrl.navigateBack('/profil/date-personale');
              this.formSubmitting = false;
            },
            (err) => {
              if (err === 'falseGDPR') {
                this.errorMsgs = genericErrorTexts(
                  'A fost identificat?? lipsa acordului t??u privind procesare datelor personale.',
                  '',
                  true
                );
              } else {
                this.errorMsgs = genericErrorTexts(
                  err
                    ? get(err, 'error', 'A fost identificat?? o problem??...')
                    : 'A fost identificat?? o problem??...',
                  ''
                );
              }
              this.errorPage = true;
              this.cdRef.detectChanges();
            }
          );
      }
    } else {
      this.formGroup.updateValueAndValidity();
      this.cdRef.markForCheck();
    }
  }

  get email() {
    return this.formGroup ? this.formGroup.get('email') : null;
  }
  get cnp() {
    return this.formGroup ? this.formGroup.get('cnp') : null;
  }

  ngOnDestroy() {
    this.formMode = null;
    this.formSubmitting = false;
  }

  goBack() {
    this.errorPage = false;
    this.formSubmitting = false;
    this.errorMsgs = [];
    this.cdRef.detectChanges();
  }
}
