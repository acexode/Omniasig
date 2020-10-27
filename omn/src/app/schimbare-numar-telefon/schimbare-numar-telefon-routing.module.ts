import { ChangeSuccessfulComponent } from './change-successful/change-successful.component';
import { VerifyPhoneNumberComponent } from './verify-phone-number/verify-phone-number.component';
import { ChangePhoneNumberComponent } from './change-phone-number/change-phone-number.component';
import { ChangePhoneNumberInfoComponent } from './change-phone-number-info/change-phone-number-info.component'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ChangePhoneNumberInfoComponent,
    },
    {
        path: 'enter-number',
        component: ChangePhoneNumberComponent,
    },
    {
        path: 'confirm-number/:phone',
        component: VerifyPhoneNumberComponent,
    },
    {
        path: 'change-successful',
        component: ChangeSuccessfulComponent,
    },
];

@NgModule( {
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ],
} )
export class SchimbareNumarTelefonPageRoutingModule { }
