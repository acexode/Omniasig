import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/core/services/request/request.service';
import { phoneNumberEndPoints } from 'src/app/core/configs/endpoints';
import { ConfirmNewPhoneNumber } from './../models/ConfirmNewPhoneNumber.interface';
import { RequestNewPhoneNumberChange } from './../models/RequestNewPhoneNumberChange.interface';
import { HttpClient } from '@angular/common/http';
@Injectable( {
    providedIn: 'root'
} )
export class PhonenumberService {


    constructor( private reqS: RequestService, private http: HttpClient ) { }

    updatePhoneNumber( data: RequestNewPhoneNumberChange, options: any ): Observable<any> {

        return this.http.post( phoneNumberEndPoints.RequestNewPhoneNumberChange, data, options );
        // return this.reqS.post( phoneNumberEndPoints.RequestNewPhoneNumberChange, data );
    }
    validatePhoneCode( data: ConfirmNewPhoneNumber ): Observable<any> {
        return this.reqS.post( phoneNumberEndPoints.ConfirmNewPhoneNumber, data );
    }
}
