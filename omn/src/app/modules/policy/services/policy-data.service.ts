import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { random, get, set } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, filter } from 'rxjs/operators';
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
  offerStore$: BehaviorSubject<Array<PolicyOffer>> = new BehaviorSubject(null);

  constructor(
    private reqS: RequestService,
    private authS: AuthService,
    private calendar: Calendar
  ) {
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
        this.getUserOffers().subscribe((v) =>
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
        map((pv) =>
          pv
            ? pv.map((pvi) => this.mapPolicyType(this.createPolicyObj(pvi)))
            : []
        )
      );
  }

  // create policy object to suit display data
  createPolicyObj(policy: any) {
    return {
      id: policy.id,
      typeId: 'PAD',
      state: 1,
      name: policy.policyNrChitanta,
      serial: policy.policySeriePolita,
      policyNrPolita: policy.policyNrPolita,
      policyNrChitanta: policy.policyNrChitanta,
      policyIdIncasareOMN: policy.policyIdIncasareOMN,
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
        id: policy.locuintaId,
        type: policy.locationType,
        structure: policy.locationStructure,
        yearConstruction: policy.locationYearConstruction,
        valueCurrency: policy.locationValueCurrency,
        value: policy.locationValue,
        typeUse: policy.locationArea,
        area: policy.locationArea,
        floors: policy.locationFloors,
        rooms: policy.locationRooms,
        hasAlarmSystem: policy.locationHasAlarmSystem,
        name: policy.locationName,
        addressCounty: policy.addressCounty,
        addressCity: policy.addressCity,
        addressStreet: policy.addressStreet,
        addressBuildingNumber: policy.addressStreetNumber,
        // Scara bloc.
        addressScara: policy.addressScara,
        addressApart: policy.addressApart,
        addressPostalCode: policy.addressPostalCode,
      },
      expiry: policy.expireDate,
    };
  }

  // get user offers
  getUserOffers() {
    const emptyV: Array<PolicyOffer> = [];

    return this.reqS
      .get<Array<PolicyOffer>>(this.endpoints.GetActivePADOffers)
      .pipe(
        catchError((e) => {
          return of(emptyV);
        }),
        map((ov) =>
          ov
            ? ov.map((ovi) =>
                this.mapOfferPolicyType(this.createOffersObj(ovi, 'PAD'))
              )
            : []
        )
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

  mapOfferPolicyType(o: PolicyOffer) {
    o.policy = this.mapPolicyType(o.policy);
    return o;
  }
  // ceate offer obj
  createOffersObj(offer: any, typeId: string) {
    return {
      id: offer.id,
      offerCode: offer.offerCode,
      policy: {
        id: offer.id,
        name: offer.offerCode,
        typeId,
        state: 1,
        listingSubtitle: `${offer.addressStreet}, ${offer.addressStreetNumber} ${offer.addressCity}`,
        dates: {
          from: offer.emisionDate,
          to: offer.expireDate,
        },
        locuintaData: {
          id: offer.locuintaId,

          type: offer.locationType,
          structure: offer.locationStructure,
          yearConstruction: offer.locationYearConstruction,
          valueCurrency: offer.locationValueCurrency,
          value: offer.locationValue,
          typeUse: offer.locationArea,
          area: offer.locationArea,
          floors: offer.locationFloors,
          rooms: offer.locationRooms,
          hasAlarmSystem: offer.locationHasAlarmSystem,

          name: offer.locationName,
          addressCounty: offer.addressCounty,
          addressCity: offer.addressCity,
          addressStreet: offer.addressStreet,
          addressBuildingNumber: offer.addressStreetNumber,
          // Scara bloc.
          addressScara: offer.addressScara,
          addressApart: offer.addressApart,
          addressPostalCode: offer.addressPostalCode,
        },
        userId: null,
        locuintaId: null,
      },
      nume: `${offer.userName} ${offer.userSurname}`,
      cnp: offer.userCnp,
      expiry: offer.expireDate,
    };
  }

  getSingleOfferById(id: number | string) {
    return this.offerStore$.pipe(
      filter((v) => v !== null),
      switchMap((vals) => {
        if (vals instanceof Array) {
          const existing = vals.find((v) => v.id.toString() === id.toString());
          if (existing) {
            return of(existing);
          } else {
            return of(null);
          }
        } else {
          return of(null);
        }
      })
    );
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
  }

  private getSinglePolicy(id): Observable<PolicyItem> {
    return this.reqS.get<PolicyItem>(this.endpoints.base + '/' + id).pipe(
      catchError((e) => {
        return of(null);
      })
    );
  }

  addOfferToStore(
    offerData: PolicyOffer,
    offerResponse: any
  ): Observable<PolicyOffer> {
    const iban = get(offerResponse, 'iban', null);
    const codOferta = get(
      offerResponse,
      'response.emitereOfertaResponse1.codOferta',
      null
    );
    const moneda = get(
      offerResponse,
      'response.emitereOfertaResponse1.moneda',
      null
    );
    const prima = get(
      offerResponse,
      'response.emitereOfertaResponse1.prima',
      null
    );
    const eroare = get(
      offerResponse,
      'response.emitereOfertaResponse1.eroare',
      true
    );

    return this.getUserOffers().pipe(
      switchMap((offers) => {
        this.offerStore$.next(offers ? offers : []);
        return of(offers);
      }),
      map((vals) => {
        if (vals instanceof Array && codOferta && moneda && prima && !eroare) {
          const existing = vals.find((vvv) => {
            return vvv.offerCode.toString() === codOferta.toString();
          });
          if (existing) {
            // TODO: map more data in here.
            set(existing, 'iban', iban);
            set(existing, 'prima', prima);
            set(existing, 'currency', moneda);
          }
          return existing;
        } else {
          return null;
        }
      }),
      catchError((err) => of(null))
    );
  }

  /* for Notification */
  getEightDayBeforeExpiryDate(date: string) {
    const expiryDate = new Date(date);
    const eightDaysFromExpiryDate = new Date(
      expiryDate.getTime() - 8 * 24 * 60 * 60 * 1000
    );
    return eightDaysFromExpiryDate;
  }

  addExpiryCalendarEntry(calEntry) {
    this.calendar
      .createEventInteractivelyWithOptions(
        calEntry.title,
        calEntry.location,
        calEntry.notes,
        calEntry.startDate,
        calEntry.endDate,
        calEntry.options
      )
      .then(
        (msg) => {},
        (err) => {}
      );
  }
}
