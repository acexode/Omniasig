import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppVersion } from '@ionic-native/app-version/ngx';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private appVersion: AppVersion) {}

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
