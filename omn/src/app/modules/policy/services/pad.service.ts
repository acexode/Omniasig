import { Injectable } from '@angular/core';
import { padEndpoints, paidExternalService } from '../../../core/configs/endpoints';
import { RequestService } from '../../../core/services/request/request.service';

@Injectable( {
  providedIn: 'root',
} )
export class PadService {
  constructor( private reqS: RequestService ) { }

  VerifyPADInsuranceOffer( addressId: number ) {
    return this.reqS.get<any>(
      `${ padEndpoints.VerifyPADInsuranceOffer }?addressId=${ addressId }`
    );
  }

  CreatePADInsuranceOffer(
    padAddressId: number | string,
    homeAddressId: number | string,
    startDate
  ) {
    const formattedStartDate = startDate.toISOString().slice( 0, 10 );
    return this.reqS.get<any>(
      `${ padEndpoints.CreatePADInsuranceOffer }?padAddressId=${ padAddressId }&homeAddressId=${ homeAddressId }&startDate=${ formattedStartDate }`
    );
  }

  CreatePADInsurancePolicy( padOfferId: number ) {
    return this.reqS.get<any>(
      `${ padEndpoints.CreatePADInsurancePolicy }?padOfferId=${ padOfferId }`
    );
  }
  checkPad( locationId: number, userId: any ) {
    return this.reqS.post<any>(
      `${ paidExternalService.checkPad }?locationId=${ locationId }&userId=${ userId }`, null
    );
  }
}
