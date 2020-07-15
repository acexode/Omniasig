import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomRouterService } from 'src/app/core/services/custom-router/custom-router.service';
import { DatePersonaleFormModes } from 'src/app/shared/models/modes/date-personale-form-modes';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-date-personale-form',
  templateUrl: './date-personale-form.component.html',
  styleUrls: ['./date-personale-form.component.scss'],
})
export class DatePersonaleFormComponent implements OnInit {
  title = '';
  formModes = DatePersonaleFormModes;
  formMode = null;
  formGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authS: AuthService,
    private routerS: CustomRouterService,
    private aRoute: ActivatedRoute,
    private navCtrl: NavController
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
      });
  }

  setTitles() {
    if (this.formMode === this.formModes.EDIT_EMAIL) {
      this.title = 'Schimbare adresă e-mail';
    }
    if (this.formMode === this.formModes.EDIT_CNP) {
      this.title = 'Introdu CNP';
    }
  }

  buildForm() {
    this.authS.getAccountData().subscribe((acc) => {
      if (this.formMode === this.formModes.EDIT_EMAIL) {
        this.formGroup = this.fb.group({
          email: this.fb.control(
            acc && acc.email ? acc.email : '',
            Validators.email
          ),
        });
      }
      if (this.formMode === this.formModes.EDIT_CNP) {
        this.formGroup = this.fb.group({
          cnp: this.fb.control(
            acc && acc.cnp ? acc.cnp : '',
            Validators.minLength(13)
          ),
        });
      }
    });
  }

  get email() {
    return this.formGroup ? this.formGroup.get('email') : null;
  }
  get cnp() {
    return this.formGroup ? this.formGroup.get('cnp') : null;
  }
}
