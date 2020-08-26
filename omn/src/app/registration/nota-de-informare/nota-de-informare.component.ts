import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nota-de-informare',
  templateUrl: './nota-de-informare.component.html',
  styleUrls: ['./nota-de-informare.component.scss'],
})
export class NotaDeInformareComponent implements OnInit {
  termsForm: FormGroup;
  @HostBinding('class') color = 'ion-color-white-page';
  constructor(private router: Router, private formBuilder: FormBuilder) {}

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
  
}
