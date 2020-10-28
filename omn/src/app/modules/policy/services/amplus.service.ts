import { get } from 'lodash';
import { Injectable } from '@angular/core';
import {
  amplusEndpoints,
  documentEndpoint,
} from '../../../core/configs/endpoints';
import { RequestService } from '../../../core/services/request/request.service';
import { map } from 'rxjs/operators';

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

  CreateAmplusPadInsuranceOffer(
    amplusAddressId: number | string,
    generateOffer: boolean,
    payload: any,
    padOfferId: number | string,
  ) {
    return this.reqS.post<any>(
      `${amplusEndpoints.CreateAmplusInsuranceOffer}?amplusAddressId=${amplusAddressId}&generateOffer=${generateOffer}&padOfferId=${padOfferId}`,
      payload
    );
  }

  getAmplusOfferDocument(amplusOfferDocumentId: number) {
    return this.reqS
      .get<any>(
        `${documentEndpoint.getDocument}?documentId=${amplusOfferDocumentId}`
      )
      .pipe(
        map((v) => {
          return get(v, 'file', null);
        })
      );
  }

  getAmplusPolicyDocument(amplusPolicyDocumentId: number) {
    return this.reqS
      .get<any>(
        `${documentEndpoint.getDocument}?documentId=${amplusPolicyDocumentId}`
      )
      .pipe(
        map((v) => {
          return get(v, 'file', null);
        })
      );
  }
}
