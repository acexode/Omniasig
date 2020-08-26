import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInput, NavController } from '@ionic/angular';

@Component({
  selector: 'app-passcode',
  templateUrl: './passcode.component.html',
  styleUrls: ['./passcode.component.scss'],
})
export class PasscodeComponent implements OnInit,OnDestroy {
  min: string = '00'
  sec: any = 59;
   digitsLength: number = 0;
  @ViewChild('inputField') inputField: IonInput;
  passForm: FormGroup;
  phoneNumber:string =null
  sub:Subscription;
  busy:boolean = false
  constructor(private navCtrl: NavController,private formBuilder: FormBuilder,private route:ActivatedRoute,private authService:AuthService) {
    this.getPhoneNumber()
   }

  ngOnInit() {
this.initForm()
  }


  getPhoneNumber() {
    this.sub = this.route.params.subscribe((params) => {
      if (params.number) {
        this.phoneNumber = params.number;
      } else {
        this.navCtrl.navigateForward(['/login']);
      }
    });
  }

  initForm(){
    this.passForm = this.formBuilder.group({
      passcode: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
  });

  this.passForm.valueChanges.subscribe((value)=>{
    this.changeInput(value.passcode)   
  })
  }

   changeInput(passcode) {
    if (passcode) {
      this.digitsLength = passcode.toString().length
    }
    if (this.digitsLength > 5) {
      this.verifyPasscode()
    }
  }

  verifyPasscode() {
    const data ={
      phone:this.phoneNumber,
      password:this.passForm.controls["passcode"].value,
      aRoute:"/home"
    }
    this.authService.login(data).subscribe((obs)=>{
      // console.log(obs);
    })
  }

  spawnInput(){
   this.inputField.getInputElement().then((input) => {
     input.focus();
     input.click()
   })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe()
  }
}
