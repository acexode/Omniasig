import { Router } from '@angular/router';
import { EmailValidateModes } from 'src/app/shared/models/modes/email-validate-modes';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, Platform } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private cdRef: ChangeDetectorRef,
    private deeplinks: Deeplinks,
    protected router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.handleDeepLink();
      // Call the element loader after the platform has been bootstrapped
      defineCustomElements(window);
    });
  }

  handleDeepLink() {
    this.deeplinks
      .route({
        '/api/UserProfile/ConfirmEmailForRegisterUserProfile':
          '/profil/date-personale/validate-email-check',
        '/api/UserProfile/ConfirmationNewEmailChange':
          '/profil/date-personale/validate-email-change-check',
      })
      .subscribe(
        (match) => {
          if (match.$route) {
            const props = match.$args;
            if (props) {
              this.router.navigateByUrl(
                this.router.createUrlTree([match.$route], {
                  queryParams: props,
                })
              );
            } else {
              this.router.navigateByUrl(match.$route);
            }
          }

          console.log('Successfully matched route', match.$route);
          console.log(match);
        },
        (nomatch) => {
          // nomatch.$link - the full link data
          console.error("Got a deeplink that didn't match", nomatch);
        }
      );
  }

  handleKeyboard() {
    this.platform.keyboardDidShow.subscribe((ev) => {
      this.cdRef.markForCheck();
      this.cdRef.detectChanges();
    });

    this.platform.keyboardDidHide.subscribe(() => {
      this.cdRef.markForCheck();
      this.cdRef.detectChanges();
    });
  }
}
