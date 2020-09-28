import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  appVersion$: BehaviorSubject<string> = new BehaviorSubject(null);
  constructor(private appVersion: AppVersion, private platform: Platform) {
    this.platform.ready().then(() => {
      this.appVersion.getVersionNumber().then((v) => {
        this.appVersion$.next(v);
      });
    });
  }

  public getVersionNumber() {
    return this.appVersion.getVersionNumber();
  }
  public getConfig() {
    return environment;
  }

  private getConfigKey(k: string) {
    const config = this.getConfig();
    return config.hasOwnProperty(k) ? config[k] : null;
  }

  public getRecaptchaKey() {
    return this.getConfigKey('recaptchaKey');
  }

  public getFakeBackendConfig() {
    return this.getConfigKey('fakeBackend');
  }
  public getServerUrlConfig() {
    return this.getConfigKey('serverUrl');
  }
  public activateDelay() {
    return this.getConfigKey('activateDelay');
  }

  public release() {
    return this.getConfigKey('release');
  }
}
