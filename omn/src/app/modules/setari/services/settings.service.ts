import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { authEndpoints } from '../../../core/configs/endpoints';
import { CustomStorageService } from './../../../core/services/custom-storage/custom-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settings: any = {
    notifications: null,
    marketing: null,
  };
  settings$: BehaviorSubject<any> = new BehaviorSubject(this.settings);
  constructor(
    private reqS: RequestService,
    private storeS: CustomStorageService,
    private auth: AuthService
  ) {
    this.initData();
  }

  initData() {
    this.getSettings();
  }

  toggleFaceId(state: boolean) {
    return this.storeS.setItem('useFaceId', state);
  }

  getFaceIdState(): Observable<boolean> {
    return this.storeS.getItem('useFaceId');
  }

  updateSettings(value: any): Observable<any> {
    this.settings = { ...this.settings, ...value };
    return this.reqS
      .post(authEndpoints.ChangeMarketingAndNotificationSettings, this.settings)
      .pipe(
        tap((v) => {
          this.auth.doUpdateAccount(this.settings);
        })
      );
  }

  private getSettings() {
    this.auth.getAccountData().subscribe((data: any) => {
      this.settings = {
        notifications: data.notifications ? data.notifications : false,
        marketing: data.marketing ? data.marketing : false,
      };
      this.settings$.next(this.settings);
    });
  }
}
