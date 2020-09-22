import { Injectable } from '@angular/core';
import { amplusEndpoints } from '../../../core/configs/endpoints';
import { RequestService } from '../../../core/services/request/request.service';

@Injectable({
  providedIn: 'root',
})
export class AmplusService {
  constructor(private reqS: RequestService) {}

  CreateAmplusInsuranceOffer(
    amplusAddressId: number | string,
    generateOffer: boolean,
    payload: any
  ) {
    return this.reqS.post<any>(
      `${amplusEndpoints.CreateAmplusInsuranceOffer}?amplusAddressId=${amplusAddressId}&generateOffer=${generateOffer}`,
      payload
    );
  }
}
