import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { switchMap, finalize, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { DatePersonaleFormModes } from 'src/app/shared/models/modes/date-personale-form-modes';
import { EmailValidateModes } from 'src/app/shared/models/modes/email-validate-modes';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CustomTimersService } from 'src/app/core/services/custom-timers/custom-timers.service';
import { cnpValidator } from 'src/app/shared/validators/cnp-validator';
import { ThrowStmt } from '@angular/compiler';

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
  errorPage = false
  erroMsg = ''
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
        'Schimbare adresă e-mail',
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
    this.authS.getAccountData().subscribe((acc) => {
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
          cnp: this.fb.control(acc && acc.cnp ? acc.cnp : '', [
            Validators.minLength(13),
            Validators.maxLength(13),
            Validators.pattern('[0-9]*'),
            Validators.required,
            cnpValidator
          ]),
        });
      }
    });
  }

  submitForm() {
    if (this.formGroup.valid) {
      if (this.formMode === this.formModes.EDIT_EMAIL) {
        this.formSubmitting = true;

        this.formSubmitting = false;
        this.authS
          .doChangeEmail(this.email.value)
          .pipe(
            finalize(() => {
              this.authS.doUpdateAccount({ newEmail: this.email.value });

              this.navCtrl.navigateForward(
                this.formMode === this.formModes.EDIT_EMAIL
                  ? '/profil/date-personale/validate-email-change'
                  : '/profil/date-personale/validate-email'
              );
              this.formSubmitting = false;
            })
          )
          .subscribe();
      } else if (this.formMode === this.formModes.EDIT_CNP) {
        this.authS.getPhoneNumber().subscribe(e => {
          this.authS.checkCNP(this.cnp.value, e).subscribe(e => {            
              this.authS.doUpdateAccount({ cnp: this.cnp.value });
              this.navCtrl.navigateBack('/profil/date-personale');
          }, (err) => {
            this.errorPage = true;
            this.errorPage = err.error;
            this.cdRef.detectChanges();
          })
        })
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
  goBack(){    
    this.errorPage = false
    this.cdRef.detectChanges();
  }
}
