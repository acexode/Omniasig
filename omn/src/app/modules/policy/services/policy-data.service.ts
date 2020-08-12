import { Injectable } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { policyEndpoints } from 'src/app/core/configs/endpoints';
import { RequestService } from 'src/app/core/services/request/request.service';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { policyTypes } from 'src/app/shared/models/data/policy-types';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PolicyDataService {
  endpoints = policyEndpoints;
  policyStore$: BehaviorSubject<Array<PolicyItem>> = new BehaviorSubject([]);
  policyArchiveStore$: BehaviorSubject<Array<PolicyItem>> = new BehaviorSubject(
    []
  );
  offerStore$: BehaviorSubject<Array<PolicyOffer>> = new BehaviorSubject([]);

  constructor(private reqS: RequestService, private authS: AuthService) {
    this.initData();
  }

  initData() {
    this.authS.getAccountData().subscribe((account) => {
      if (this.authS.accountActivated(account)) {
        this.getUserPolicies(account.id).subscribe((vv) => {
          this.policyStore$.next(vv ? vv : []);
        });
        this.getUserPoliciesArchive(account.id).subscribe((vv) => {
          this.policyArchiveStore$.next(vv ? vv : []);
        });
        this.getUserOffers(account.id).subscribe((v) =>
          this.offerStore$.next(v ? v : [])
        );
      }
    });
  }

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

  getUserPoliciesArchive(id: number | string) {
    const emptyV: Array<PolicyItem> = [];
    return this.reqS
      .get<Array<PolicyItem>>(this.endpoints.userPoliciesArchive + '/' + id)
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

  getSinglePolicyById(id) {
    return this.policyStore$.pipe(
      switchMap((vals) => {
        if (vals instanceof Array) {
          const existing = vals.find((v) => v.id.toString() === id.toString());
          if (existing) {
            return of(existing);
          } else {
            return this.getSinglePolicy(id);
          }
        } else {
          return this.getSinglePolicy(id);
        }
      })
    );
  };

  private getSinglePolicy(id): Observable<PolicyItem> {
    return this.reqS.get<PolicyItem>(this.endpoints.base + '/' + id).pipe(
      catchError((e) => {
        return of(null);
      })
    );
  }
}
