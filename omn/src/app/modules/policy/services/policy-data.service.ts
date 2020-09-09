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

  // get user policy offer
  getUserPolicies(id: number | string) {
    const emptyV: Array<PolicyItem> = [];
    return this.reqS
      .get<Array<PolicyItem>>(this.endpoints.GetActivePADPolicies)
      .pipe(
        catchError((e) => {
          return of(emptyV);
        }),
        map((pv) => (pv ? pv.map((pvi) => this.mapPolicyType(this.createPolicyObj(pvi))) : []))
      );
  }

  // create policy object to suit display data
  createPolicyObj(policy: any) {
    console.log(policy);
    
    return {
      id: policy.id,
      typeId: "PAD",
      state: 1,
      name: policy.policyNrChitanta,
      serial:policy.policySeriePolita,
      policyNrPolita:policy.policyNrPolita,
      policyNrChitanta:policy.policyNrChitanta,
      policyIdIncasareOMN:policy.policyIdIncasareOMN,
      userId: null,
      locuintaId: null,
      userData: {
        fullName: `${policy.userName} ${policy.userSurname}`,
        cnp: policy.userCnp,
      },
      dates: {
        from: policy.emisionDate,
        to: policy.expireDate,
      },
      listingSubtitle: `${policy.addressStreet}, ${policy.addressStreetNumber} ${policy.addressCity}`,
      locuintaData: {
        id: policy.id,
        name: policy.locationName,
        info: {
          type: policy.locationType,
          resistenceStructure: policy.locationStructure,
          buildYear: policy.locationYearConstruction,
          valueCurrency: policy.locationValueCurrency,
          valueSum: policy.locationValue,
          occupancy: policy.locationArea,
          usableSurface: policy.locationArea,
          heightRegime: policy.locationFloors,
          roomCount: policy.locationRooms,
          alarm: policy.locationHasAlarmSystem,
        },
        address: {
          county: policy.addressCounty,
          city: policy.addressCity,
          street: policy.addressStreet,
          number: policy.addressStreetNumber,
          // Scara bloc.
          entrance: policy.addressScara,
          apartment: policy.addressApart,
          postalCode: policy.addressPostalCode,
        },
      },
      expiry: policy.expireDate
    }
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
