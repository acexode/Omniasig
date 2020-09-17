import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugestiiPageRoutingModule } from './sugestii-routing.module';

import { SugestiiPage } from './sugestii.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        SugestiiPageRoutingModule,
        SharedModule
    ],
    declarations: [ SugestiiPage ]
} )
export class SugestiiPageModule { }
