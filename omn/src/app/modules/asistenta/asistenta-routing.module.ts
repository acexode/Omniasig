import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistentaPage } from './asistenta.page';

const routes: Routes = [
    {
        path: '',
        component: AsistentaPage,
    },
    {
        path: 'petitii',
        loadChildren: () => import( './petitii/petitii.module' ).then( m => m.PetitiiPageModule )
    }
];

@NgModule( {
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ],
} )
export class AsistentaPageRoutingModule { }
