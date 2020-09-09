import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component( {
    selector: 'app-change-successful',
    templateUrl: './change-successful.component.html',
    styleUrls: [ './change-successful.component.scss' ],
} )
export class ChangeSuccessfulComponent implements OnInit {

    constructor( private navCtrl: NavController ) { }

    ngOnInit() {
        this.redirectHome();
    }

    redirectHome() {
        // redirect back to home page after 3seconds
        setTimeout( () => {
            this.navCtrl.navigateBack( 'home' );
        }, 3000 );
    }

}
