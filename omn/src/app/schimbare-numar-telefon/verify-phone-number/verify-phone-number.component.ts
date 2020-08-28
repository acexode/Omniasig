import { Location } from '@angular/common';
import {
    Component,
    OnInit,
    ViewChild,
    OnDestroy,
    AfterViewInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CustomTimersService } from 'src/app/core/services/custom-timers/custom-timers.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PhonenumberService } from '../services/phonenumber.service';
import { ConfirmNewPhoneNumber } from '../models/ConfirmNewPhoneNumber.interface';

@Component( {
    selector: 'app-verify-phone-number',
    templateUrl: './verify-phone-number.component.html',
    styleUrls: [ './verify-phone-number.component.scss' ],
} )
export class VerifyPhoneNumberComponent
    implements OnInit, OnDestroy, AfterViewInit {
    headerConfig = subPageHeaderDefault( 'Cod de verificare' );
    min = '00';
    sec: any = 59;
    digitsLength = 0;
    @ViewChild( 'inputField' ) inputField: IonInput;
    sub: Subscription;
    phoneNumber = null;

    config: IonInputConfig = {
        type: 'number',
        inputMode: 'number',
    };
    passForm: FormGroup;
    InvalidCode = false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private timers: CustomTimersService,
        private formBuilder: FormBuilder,
        private location: Location,
        private phS: PhonenumberService,
        private authS: AuthService,
    ) {
        this.route.params.subscribe( ( params ) => {
            if ( params.phone ) {
                this.phoneNumber = params.phone;
            } else {
                this.location.back();
            }
        } );
    }

    ngOnInit() {
        this.initForm();
    }
    initForm() {
        this.passForm = this.formBuilder.group( {
            digit: [
                '',
                [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 6 ) ],
            ],
        } );

        this.sub = this.passForm.valueChanges.subscribe( ( value ) => {
            this.changeInput( value.digit );
        } );
    }

    changeInput( digit: number ) {
        if ( digit ) {
            this.digitsLength = digit.toString().length;
        } else {
            this.digitsLength = 0;
        }
    }

    continueTest() {
        if ( this.passForm.controls.digit.value === 123456 ) {
            this.proceed();
        } else {
            this.InvalidCode = true;
            setTimeout( () => {
                this.InvalidCode = false;
                this.passForm.reset();
            }, 2000 );
        }
    }

    ngAfterViewInit() {
        this.startTimer();
    }

    startTimer() {
        this.timers.buildTimer( 59 ).subscribe( ( time: number ) => {
            this.sec = time;
        } );
    }

    resendSMS() {
        this.startTimer();
    }

    proceed() {
        this.router.navigate( [ 'phone-number/change-successful' ] );
    }

    continue() {
        this.authS.getAuthState().subscribe( authData => {
            const { userId } = authData.account;
            const requestNewPhoneDetails: ConfirmNewPhoneNumber = {
                confirmationCode: this.passForm.controls.digit.value,
                userNameOrId: userId,
                newPhoneNumber: this.phoneNumber,
            };
            console.log( requestNewPhoneDetails );
            this.phS.validatePhoneCode( requestNewPhoneDetails )
                .subscribe(
                    response => {
                        this.proceed();
                    },
                    err => {
                        this.InvalidCode = true;
                        setTimeout( () => {
                            this.InvalidCode = false;
                            this.passForm.reset();
                        }, 2000 );
                    }
                );
        } );
    }

    spawnInput() {
        this.inputField.getInputElement().then( ( input ) => {
            input.focus();
            input.click();
        } );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
