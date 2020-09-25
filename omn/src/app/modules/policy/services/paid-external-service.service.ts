import { Injectable } from '@angular/core';
import { paidExternalService } from '../../../core/configs/endpoints';
import { RequestService } from '../../../core/services/request/request.service';
import { PaidExternalServiceModel } from '../models/paid-external-service';

@Injectable({
  providedIn: 'root',
})
export class PaidExternalService {
  startDate;

  constructor(private reqS: RequestService) {}

  CheckPAD(data: PaidExternalServiceModel) {
    return this.reqS.post<any>(
      `${paidExternalService.CheckPAD}?locationId=${data.locationId}&userId=${data.userId}`,
      null
    );
  }
}
