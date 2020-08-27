import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { PhonenumberService } from '../services/phonenumber.service';
import { RequestNewPhoneNumberChange } from '../models/RequestNewPhoneNumberChange.interface';
import { HttpHeaders } from '@angular/common/http';

@Component( {
    selector: 'app-change-phone-number',
    templateUrl: './change-phone-number.component.html',
    styleUrls: [ './change-phone-number.component.scss' ],
} )
export class ChangePhoneNumberComponent implements OnInit {
    headerConfig = subPageHeaderDefault( 'Schimbare număr  telefon' );
    label: IonTextItem = {
        text: 'Introdu noul număr de telefon',
        classes: 'link-small color-tertiary-grey w-100 bg-white pb-8',
        slot: 'end',
    };
    config: IonInputConfig = {
        placeholder: '07XX XXX XXX',
        type: 'tel',
        inputMode: 'tel',
        size: 100,
        inputLabel: this.label,
        clearable: true,
        minLength: 10,
        maxLength: 11,
    };
    teleForm: FormGroup;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private phS: PhonenumberService
    ) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.teleForm = this.formBuilder.group( {
            phoneNumber: [
                '',
                [
                    Validators.required,
                    Validators.pattern( /^07[0-9].*$/ ),
                    Validators.minLength( 9 ),
                ],
            ],
        } );
    }

    proceed() {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvY2pib3Njb0BnbWFpbC5jb20iLCJqdGkiOiI2ODE1MTE5My1kNjA0LTRlNTMtODE1My05NmNjZTJiZGVkNzgiLCJ1bmlxdWVfbmFtZSI6IjA3MzM2ODczMzIiLCJBcGlDZW50ZXIvUGVybWlzc2lvbiI6WyJDbGllbnRpUmVzZXRhcmVQYXNzY29kZSIsIkNsaWVudGlSZXZhbGlkYXJlRW1haWwiLCJDbGllbnRpUmV2YWxpZGFyZVRlbGVmb24iXSwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiTW9iaWxlVXNlciIsImV4cCI6MTU5ODUyNDQyMCwiaXNzIjoibG9jYWxob3N0IiwiYXVkIjoib21uaWFzaWcuY29tIn0.6B6sakGrwDJDa2TlNfyIaCqW0semhIgukA0pRQNUR5o';
        const newPhoneNumber = this.teleForm.controls.phoneNumber.value;
        const requestNewPhoneDetails: RequestNewPhoneNumberChange = {
            userNameOrId: '7e7f51a1-5f7e-4118-9fee-74fb407400fe',
            newPhoneNumber: '0733687337',
        };

        const options = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            )
        };

        this.phS.updatePhoneNumber( requestNewPhoneDetails, options )
            .subscribe(
                reponse => {
                    // Will review this
                    // this.teleForm.controls[ 'phoneNumber' ].value,
                    console.log( reponse);
                    this.router.navigate( [
                        'phone-number/confirm-number',
                        newPhoneNumber,
                    ] );
                },
                err => {
                    // error
                    console.log( err);
                }
            );
    }
}
