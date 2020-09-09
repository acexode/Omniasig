import { Component, ChangeDetectorRef } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


@Component( {
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.scss' ],
} )
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private cdRef: ChangeDetectorRef
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then( () => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            // Call the element loader after the platform has been bootstrapped
            defineCustomElements( window );
        } );
    }

    handleKeyboard() {
        this.platform.keyboardDidShow.subscribe( ( ev ) => {
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
        } );

        this.platform.keyboardDidHide.subscribe( () => {
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
        } );
    }
}
