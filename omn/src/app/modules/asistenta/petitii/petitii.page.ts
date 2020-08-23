import { Component, OnInit, HostBinding } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component( {
    selector: 'app-petitii',
    templateUrl: './petitii.page.html',
    styleUrls: [ './petitii.page.scss' ],
} )
export class PetitiiPage implements OnInit {
    @HostBinding( 'class' ) color = 'ion-color-white-page';
    headerConfig = subPageHeaderDefault( 'Petitii' );

    acestFormularLink = 'https://www.omniasig.ro/Formular-petitie.html';
    websiteulNostruLink = 'https://www.omniasig.ro';
    constructor() { }

    ngOnInit() {
    }

    goExternal(key: string) {
        switch (key) {
            case 'acestFormularLink':
                window.location.href = this.acestFormularLink;
                break;
            case 'websiteulNostruLink':
                window.location.href = this.websiteulNostruLink;
                break;
            default:
                break;
        }
    }

}
