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
        notification: false,
        marketing:true,
    };
    settings$: BehaviorSubject<any> = new BehaviorSubject(
        this.settings
    );
    constructor(private reqS: RequestService,
        private storeS: CustomStorageService
    ) {
        this.getSettings().subscribe(
            (data) => {
                this.settings$.next(data)
            }
        )
    }

    toggleFaceId(state: boolean) {
        return this.storeS.setItem('useFaceId', state)
    }

    getFaceIdState(): Observable<boolean> {
        return this.storeS.getItem('useFaceId')
    }

    updateSettings(value: any): Observable<any> {
        const data = {
            value
        }
        return this.reqS.post('/', data)
    }

    private getSettings(): Observable<any> {
        return of({
            notifications: true,
            marketing: true
        })
        return this.reqS.get('/')
    }
}