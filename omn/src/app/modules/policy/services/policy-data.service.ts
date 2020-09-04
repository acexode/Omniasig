import { random } from 'lodash';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { policyEndpoints } from 'src/app/core/configs/endpoints';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { policyTypes } from 'src/app/shared/models/data/policy-types';

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
        this.getUserPolicies(account.userId).subscribe((vv) => {
          this.policyStore$.next(vv ? vv : []);
        });
        this.getUserPoliciesArchive(account.userId).subscribe((vv) => {
          this.policyArchiveStore$.next(vv ? vv : []);
        });
        this.getUserOffers(account.userId).subscribe((v) =>
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

  // ceate offer obj 
  //  TODO policy_type = pad
  // TODO add a name property to the offerObj = "123456"
  // addressStreet,addressStreetNumber,addressCity 
  offerObj(offers:any[]){
return offers.map((offer)=>{
//   {
//     "id": "1",
//     "policy": {
//         "id": 2,
//         "name": "offercode",
//         "typeId": "PAD",
//         "state": 1,
//         "listingSubtitle": "Strada Traian 45, Brasov",
//          "policy_type": "PAD",
//     },
//     "expiry": "2022-07-23T12:00:00Z"
// }
})
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

  getSingleOfferById(id: number | string) {
    return this.offerStore$.pipe(
      switchMap((vals) => {
        if (vals instanceof Array) {
          const existing = vals.find((v) => v.id.toString() === id.toString());
          if (existing) {
            return of(existing);
          } else {
            return this.getUserOffers(id).pipe(
              map((o) => o.filter((off) => off.id === id))
            );
          }
        } else {
          return this.getUserOffers(id).pipe(
            map((o) => o.filter((off) => off.id === id))
          );
        }
      })
    );
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
  }

  private getSinglePolicy(id): Observable<PolicyItem> {
    return this.reqS.get<PolicyItem>(this.endpoints.base + '/' + id).pipe(
      catchError((e) => {
        return of(null);
      })
    );
  }

  addOffer(offerData: PolicyOffer): Observable<PolicyOffer> {
    return of({ ...offerData, ...{ id: random(10, 100) } }).pipe(
      map((v) => {
        const vals = this.offerStore$.value ? this.offerStore$.value : [];
        vals.push(v);
        this.offerStore$.next(vals);
        return v ? v : null;
      }),
      catchError((err) => of(null))
    );
  }
}
