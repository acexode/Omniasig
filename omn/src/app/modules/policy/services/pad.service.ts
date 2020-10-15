import { get } from 'lodash';
import { Injectable } from '@angular/core';
import {
  padEndpoints,
  documentEndpoint,
} from '../../../core/configs/endpoints';
import { RequestService } from '../../../core/services/request/request.service';
import { map } from 'rxjs/operators';

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
    padAddressId: number | string,
    startDate,
    generateOffer
  ) {
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    return this.reqS.get<any>(
      `${padEndpoints.CreatePADInsuranceOffer}?padAddressId=${padAddressId}&startDate=${formattedStartDate}&generateOffer=${generateOffer}`
    );
  }

  CreatePADInsurancePolicy(padOfferId: number) {
    return this.reqS.get<any>(
      `${padEndpoints.CreatePADInsurancePolicy}?padOfferId=${padOfferId}`
    );
  }

  getPadOfferDocument(padOfferDocumentId: number) {
    return this.reqS
      .get<any>(
        `${documentEndpoint.getDocument}?documentId=${padOfferDocumentId}`
      )
      .pipe(
        map((v) => {
          return get(v, 'file', null);
        })
      );
  }

  getPadPolicyDocument(padPolicyDocumentId: number) {
    return this.reqS
      .get<any>(
        `${documentEndpoint.getDocument}?documentId=${padPolicyDocumentId}`
      )
      .pipe(
        map((v) => {
          return get(v, 'file', null);
        })
      );
  }
}
