import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-nota-de-informare',
  templateUrl: './nota-de-informare.component.html',
  styleUrls: ['./nota-de-informare.component.scss'],
})
export class NotaDeInformareComponent implements OnInit {
  termsForm: FormGroup;
  @HostBinding( 'class' ) color = 'ion-color-white-page';
  mailToDpo = 'mailto:dpo@omniasig.ro';
  formularPetitiePrelucrareaLink = 'https://www.omniasig.ro/Formular-petitie-prelucrarea-datelor-cu-caracter-personal.html';
  gdprLink = 'https://gdpr.omniasig.ro/';
  omniasigLink = 'www.omniasig.ro';
  dataprotectionLink = 'http://www.dataprotection.ro/';
  mailToDataprotection = 'mailto:anspdcp@dataprotection.ro';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.termsForm = this.formBuilder.group({
      termOne: [false, [Validators.requiredTrue]],
      termTwo: [false, [Validators.requiredTrue]],
    });
  }

  proceed() {
    this.router.navigate(['registration/create-passcode']);
  }

  doLogout() {
    this.authService.doLogout();
  }
}
