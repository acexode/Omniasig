import { Component, OnInit, HostBinding } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component( {
    selector: 'app-asistenta',
    templateUrl: './asistenta.page.html',
    styleUrls: [ './asistenta.page.scss' ],
} )
export class AsistentaPage implements OnInit {
    @HostBinding( 'class' ) color = 'ion-color-white-page';
    headerConfig = subPageHeaderDefault( 'Asistenta' );

    constructor() { }

    ngOnInit() {
    }

}
