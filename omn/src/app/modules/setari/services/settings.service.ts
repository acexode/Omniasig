import { CustomStorageService } from './../../../core/services/custom-storage/custom-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RequestService } from 'src/app/core/services/request/request.service';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    private settings: any = {
        notifications: false,
        marketing: true,
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
        private storeS: CustomStorageService
    ) {
        this.initData()
    }

    initData() {
        this.getSettings().subscribe(
            (data) => {
                this.settings$.next(data)
            }
        )
        this.getDomiciliu().subscribe(
            data => {
                this.domiciliu$.next(data)
            }
        )
    }

    toggleFaceId(state: boolean) {
        return this.storeS.setItem('useFaceId', state)
    }

    getFaceIdState(): Observable<boolean> {
        return this.storeS.getItem('useFaceId')
    }

    updateSettings(value: Object): Observable<any> {
        const data = {
            ...value
        }
        // TODO remove after ws integration
        return of(data);
        return this.reqS.post('/', data)
    }

    private getSettings(): Observable<any> {
        // TODO remove after ws integration
        return of({
            notifications: true,
            marketing: true
        })
        return this.reqS.get('/')
    }

    private getDomiciliu(): Observable<any> {
        // TODO remove after ws integration
        return of({
            county: 'Strada Traian Brasov',
            city: 'Cod',
            street: 'jud',
            number: 45,
            postalCode: '500332'
        })
        return this.reqS.get('/')
    }
}