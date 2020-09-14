import { CustomStorageService } from './../../../core/services/custom-storage/custom-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { locuinteEndpoints,authEndpoints } from '../../../core/configs/endpoints';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    private settings: any = {
        notifications: null,
        marketing: null,
    };
    settings$: BehaviorSubject<any> = new BehaviorSubject(
        this.settings
    );
    private domiciliu: any = {
        county: null,
        city: null,
        street: null,
        number: null,
        postalCode: null
    }
    domiciliu$: BehaviorSubject<any> = new BehaviorSubject(
        this.domiciliu
    );
    constructor(private reqS: RequestService,
        private storeS: CustomStorageService,
        private auth: AuthService
    ) {
        this.initData()
    }

    initData() {
        this.getSettings();
        this.getDomiciliu().subscribe(
            (data: any[]) => {
                this.domiciliu$.next(data.find((address) => address.isHomeAddress == true))
            })
    }

    toggleFaceId(state: boolean) {
        return this.storeS.setItem('useFaceId', state)
    }

    getFaceIdState(): Observable<boolean> {
        return this.storeS.getItem('useFaceId')
    }

    updateSettings(value: Object): Observable<any> {
        this.settings = { ...this.settings, ...value };
        return this.reqS.post(authEndpoints.ChangeMarketingAndNotificationSettings, this.settings)
    }

    private getSettings() {
        this.auth.authState.subscribe(
            (data: any) => {
                this.settings = {
                    notifications: data.notifications ? data.notifications : false,
                    marketing: data.marketing ? data.marketing : false
                }
                this.settings$.next(this.settings)
            }
        )
    }

    private getDomiciliu(): Observable<any> {
        return this.reqS.get(locuinteEndpoints.GetAllLocationsForLoggedUser)
    }

}