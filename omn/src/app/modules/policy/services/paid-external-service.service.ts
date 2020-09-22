import { Injectable } from '@angular/core';
import { paidExternalService } from '../../../core/configs/endpoints';
import { RequestService } from '../../../core/services/request/request.service';
import { paidExternalServiceModel } from '../models/paid-external-service'

@Injectable({
    providedIn: 'root',
})
export class PaidExternalService {
    constructor(private reqS: RequestService) {}

    CheckPAD(data: paidExternalServiceModel) {
    return this.reqS.post<any>(`${paidExternalService.CheckPAD}?locationId=${data.locationId}&userId=${data.userId}`, null);
    }
}