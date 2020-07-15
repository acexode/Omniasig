import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/core/services/request/request.service';
import { policyEndpoints } from 'src/app/core/configs/endpoints';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { policyTypes } from 'src/app/shared/models/data/policy-types';

@Injectable({
  providedIn: 'root',
})
export class PolicyDataService {
  constructor(private reqS: RequestService) {}
  endpoints = policyEndpoints;

  getUserPolicies(id: number | string) {
    const emptyV: Array<PolicyItem> = [];
    return this.reqS
      .get<Array<PolicyItem>>(this.endpoints.userPoliciesBase + '/' + id)
      .pipe(
        catchError((e) => {
          return of(emptyV);
        }),
        map((pv) => (pv ? pv.map((pvi) => this.mapPolicyType(pvi)) : []))
      );
  }
  getUserOffers(id: number | string) {
    const emptyV: Array<PolicyOffer> = [];
    return this.reqS
      .get<Array<PolicyOffer>>(this.endpoints.userOffersBase + '/' + id)
      .pipe(
        catchError((e) => {
          return of(emptyV);
        }),
        map((ov) => (ov ? ov.map((ovi) => this.mapOfferPolicyType(ovi)) : []))
      );
  }

  mapOfferPolicyType(o: PolicyOffer) {
    o.policy = this.mapPolicyType(o.policy);
    return o;
  }
  mapPolicyType(p: PolicyItem) {
    const typeV = policyTypes[p.typeId] ? policyTypes[p.typeId] : null;
    if (typeV) {
      p.type = { ...typeV };
    }
    return p;
  }
}
