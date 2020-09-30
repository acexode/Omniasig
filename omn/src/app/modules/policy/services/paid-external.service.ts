import { Injectable } from '@angular/core';
import { paidExternalService } from '../../../core/configs/endpoints';
import { RequestService } from '../../../core/services/request/request.service';
import { PaidExternal } from '../models/paid-external-model';

@Injectable( {
    providedIn: 'root',
} )
export class PaidExternalService {
    constructor( private reqS: RequestService ) { }

    CheckPAD( data: PaidExternal ) {
        return this.reqS.post<any>(
            `${ paidExternalService.CheckPAD }?locationId=${ data.locationId }&userId=${ data.userId }`,
            null
        );
    }
}
