import { Injectable } from '@angular/core';
import {
  AppLauncher,
  AppLauncherOptions,
} from '@ionic-native/app-launcher/ngx';
import { Platform } from '@ionic/angular';
import { NativeFunctionalities } from 'src/app/core/models/native-functionalities';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WebIntent } from '@ionic-native/web-intent/ngx';

@Injectable({
  providedIn: 'root',
})
export class OmnAppLauncherService {
  constructor(
    private appLauncher: AppLauncher,
    private platform: Platform,
    private webIntent: WebIntent
  ) {}

  buildAppOptions(funct: NativeFunctionalities, data: any = null) {
    const options: AppLauncherOptions = {};
    switch (funct) {
      case NativeFunctionalities.READ_EMAIL:
        if (this.platform.is('ios')) {
          options.uri = 'message://';
        } else if (this.platform.is('android')) {
          options.uri = 'mailto://';
        }
        break;

      default:
        return null;
    }
    return options;
  }

  buildIntentOptions(funct: NativeFunctionalities, data: any = null) {
    let options = null;
    switch (funct) {
      case NativeFunctionalities.READ_EMAIL:
        options = {
          action: this.webIntent.ACTION_VIEW,
          type: 'vnd.android.cursor.item/email',
        };
        break;

      default:
        return null;
    }
    return options;
  }

  tryEmailRead() {
    const options = this.buildAppOptions(NativeFunctionalities.READ_EMAIL);
    const optionsI = this.buildIntentOptions(NativeFunctionalities.READ_EMAIL);
    console.log(options);
    return this.checFunct(options).pipe(
      switchMap(() => {
        if (this.platform.is('ios')) {
          return this.doLaunch(options);
        } else if (optionsI !== null) {
          return this.doIntent(optionsI);
        } else {
          throwError(null);
        }
      })
    );
  }

  checFunct(options: AppLauncherOptions) {
    return new Observable((observer) => {
      this.appLauncher
        .canLaunch(options)
        .then((canLaunch: boolean) => observer.next(canLaunch))
        .catch((error: any) => observer.error(error));
    });
  }

  doLaunch(options: AppLauncherOptions) {
    return new Observable((observer) => {
      this.appLauncher
        .launch(options)
        .then((data) => {
          observer.next(data);
        })
        .catch((err) => {
          observer.next(err);
        });
    });
  }

  doIntent(options: any) {
    return new Observable((observer) => {
      this.webIntent
        .startActivity(options)
        .then((data) => {
          observer.next(data);
        })
        .catch((err) => {
          observer.next(err);
        });
    });
  }
}
