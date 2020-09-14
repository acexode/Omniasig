import { Injectable } from '@angular/core';
import { padEndpoints } from '../../../core/configs/endpoints';
import { RequestService } from '../../../core/services/request/request.service';

@Injectable({
  providedIn: 'root',
})
export class PadService {
  constructor(private reqS: RequestService) {}

  VerifyPADInsuranceOffer(addressId: number) {
    return this.reqS.get<any>(
      `${padEndpoints.VerifyPADInsuranceOffer}?addressId=${addressId}`
    );
  }

  CreatePADInsuranceOffer(
    padAddressId: number,
    homeAddressId: number,
    startDate
  ) {
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    return this.reqS.get<any>(
      `${padEndpoints.CreatePADInsuranceOffer}?padAddressId=${padAddressId}&homeAddressId=${homeAddressId}&startDate=${formattedStartDate}`
    );
  }

  CreatePADInsurancePolicy(padOfferId: number) {
    return this.reqS.get<any>(
      `${padEndpoints.CreatePADInsurancePolicy}?padOfferId=${padOfferId}`
    );
  }
}
