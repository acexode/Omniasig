import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { get } from 'lodash';
import * as qs from 'qs';

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
    protected router: Router,
    private zone: NgZone
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
            const props = get(match, '$args', {});
            const queryString = get(match, '$link.queryString', '');
            // Use a separate query string parser so that we don't break tokens.
            // Existing Bug: https://github.com/angular/angular/issues/18261
            const qso = qs.parse(queryString, {
              decoder: (str) => {
                return decodeURIComponent(str);
              },
            });
            const convertedProps = btoa(JSON.stringify(qso));
            if (props) {
              props.RawProperties = convertedProps;
              this.router.navigateByUrl(
                this.router.createUrlTree([match.$route], {
                  queryParams: props,
                })
              );
            } else {
              this.zone.run(() => {
                this.router.navigateByUrl(match.$route);
              });
            }
          }
        },
        (nomatch) => {
          // nomatch.$link - the full link data
        }
      );
  }

  handleKeyboard() {
    this.platform.keyboardDidShow.subscribe((ev) => {
      this.cdRef.markForCheck();
    });

    this.platform.keyboardDidHide.subscribe(() => {
      this.cdRef.markForCheck();
    });
  }
}
