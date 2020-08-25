import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomTimersService } from 'src/app/core/services/custom-timers/custom-timers.service';

@Component({
  selector: 'app-nota-de-informare',
  templateUrl: './nota-de-informare.component.html',
  styleUrls: ['./nota-de-informare.component.scss'],
})
export class NotaDeInformareComponent implements OnInit {
  termsForm:FormGroup

  constructor(private route: ActivatedRoute, private router: Router,private timers: CustomTimersService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.termsForm = this.formBuilder.group({
      termOne: ['', [Validators.required]],
      termTwo: ['', [Validators.required]],
  });
  this.termsForm.valueChanges.subscribe((terms)=>{
   if (!terms.termOne || !terms.termTwo) {
     this.termsForm.setErrors({not_agreed:true})
   } 
  })
}

proceed(){
  this.router.navigate(["registration/create-passcode"])
}
}
