import { HomePage } from './home/home.page';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
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
    private router: Router,
    private zone: NgZone,
    private deeplinks: Deeplinks
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
        '/home': HomePage,
      })
      .subscribe(
        (match) => {
          // match.$route - the route we matched, which is the matched entry from the arguments to route()
          // match.$args - the args passed in the link
          // match.$link - the full link data
          console.log('Successfully matched route', match);
          const internalLink = `/${match.$route}/${match.$args['code']}`;
          this.zone.run(() => {
            this.router.navigateByUrl(internalLink);
          });
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
