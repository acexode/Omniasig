import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { RequestService } from 'src/app/core/services/request/request.service';

@Injectable( {
    providedIn: 'root'
} )
export class PhonenumberService {

    private phoneEndPoint = {
        RequestNewPhoneNumberChange: '/api/UserProfile/RequestNewPhoneNumberChange',
        ConfirmNewPhoneNumber: '/api​/UserProfile/ConfirmNewPhoneNumber'
    };

    constructor( private reqS: RequestService ) { }

    updatePhoneNumber( data: any ): Observable<any> {
        const options = {
            headers: new HttpHeaders( {
                'Content-Type': 'application/json',
            } )
        };
        return this.reqS.post( this.phoneEndPoint.RequestNewPhoneNumberChange, options );

    }
    validatePhoneCode() { }
}
