import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { get, set } from 'lodash';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
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
        from: policy.offerDate,
        to: policy.expirationDate,
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
        addressStreetNumber: policy.addressStreetNumber,
        addressBuildingNumber: policy.addressBuildingNumber,
        // Scara bloc.
        addressScara: policy.addressScara,
        addressApart: policy.addressApart,
        addressPostalCode: policy.addressPostalCode,
      },
      expiry: policy.expirationDate,
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
        map((ov) => {
          return ov
            ? ov.map((ovi) =>
              this.mapOfferPolicyType(this.createOffersObj(ovi, 'PAD'))
            )
            : [];
        }),
        switchMap((padOffers) =>
          this.reqS
            .get<Array<PolicyOffer>>(this.endpoints.GetActiveAmplusOffers)
            .pipe(
              catchError((e) => {
                return of(emptyV);
              }),
              map((ov) => {
                return ov
                  ? ov.map((ovi) =>
                    this.mapOfferPolicyType(
                      this.createOffersObj(ovi, 'AMPLUS')
                    )
                  )
                  : [];
              }),
              map((amplusOffers) => {
                return [...amplusOffers, ...padOffers];
              })
            )
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
    const offerObj = {
      id: offer.id,
      offerCode: offer.offerCode,
      iban: offer.offerIBAN,
      ratePlanList: offer.ratePlanList,
      offerPrice: offer.offerPrima,
      firstPaymentValue: offer.firstPaymentValue,
      policy: {
        id: offer.id,
        name: offer.offerCode,
        typeId,
        state: 1,
        listingSubtitle: `${offer.addressStreet}, ${offer.addressStreetNumber} ${offer.addressCity}`,
        dates: {
          from: offer.offerDate,
          to: offer.expirationDate,
        },
        locuintaData: {
          id: offer.locuintaId,
          type: offer.locationType,
          structure: offer.locationStructure,
          yearConstruction: offer.locationYearConstruction,
          valueCurrency: offer.locationValueCurrency,
          value: offer.locationValue,
          typeUse: offer.locationTypeUse,
          area: offer.locationArea,
          floors: offer.locationFloors,
          rooms: offer.locationRooms,
          hasAlarmSystem: offer.locationHasAlarmSystem,
          name: offer.locationName,
          addressCounty: offer.addressCounty,
          addressCity: offer.addressCity,
          addressStreet: offer.addressStreet,
          addressStreetNumber: offer.addressStreetNumber,
          addressBuildingNumber: offer.addressBuildingNumber,
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
      expiry: offer.expirationDate,
      emisionDate: offer.offerDate ? new Date(offer.offerDate) : '',
      insurancePrice: offer.offerPrima || 0,
    };
    if (typeId === 'AMPLUS') {
      offerObj.expiry = get(offer, 'offerExpireDate', '');
      const isGold = get(offer, 'isGold', false);
      const isVip = get(offer, 'isVip', false);
      set(offerObj, 'supportData', isGold ? 'GOLD' : isVip ? 'VIP' : '-');
      set(offerObj, 'ratePlanList', get(offer, 'ratePlanList', []));
    }
    return offerObj;
  }

  getSingleOfferById(id: number | string, type = 'PAD') {
    return this.offerStore$.pipe(
      filter((v) => v !== null),
      switchMap((vals) => {
        if (vals instanceof Array) {
          const existing = vals.find(
            (v) =>
              v.id.toString() === id.toString() &&
              get(v, 'policy.typeId', 'PAD') === type
          );
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
    offerResponse: any,
    policyType: string
  ): Observable<PolicyOffer> {
    const { iban, codOferta, moneda, prima, eroare, mesaj } =
      policyType === 'PAD'
        ? this.processPadOffer(offerResponse)
        : this.processAmplusOffer(offerResponse);

    if (eroare) {
      return throwError(mesaj);
    }
    return this.getUserOffers().pipe(
      switchMap((offers) => {
        this.offerStore$.next(offers ? offers : []);
        return of(offers);
      }),
      map((vals) => {
        if (vals instanceof Array && codOferta && moneda && prima && !eroare) {
          const existing = vals.find((vvv) => {
            // not all offers has an offercode -- add check to avoid throwing error
            if (vvv.offerCode) {
              return vvv.offerCode.toString() === codOferta.toString();
            }
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

  processPadOffer(offerResponse) {
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
    const mesaj = get(
      offerResponse,
      'response.emitereOfertaResponse1.mesaj',
      ''
    );

    return { iban, codOferta, moneda, prima, eroare, mesaj };
  }

  processAmplusOffer(offerResponse) {
    const iban = get(offerResponse, 'iban', null);
    const codOferta = get(
      offerResponse,
      'response.ofertaResponse.codOferta',
      null
    );
    const moneda = get(offerResponse, 'response.ofertaResponse.moneda', null);
    const prima = get(offerResponse, 'response.ofertaResponse.prima', null);
    const eroare = get(offerResponse, 'response.ofertaResponse.eroare', true);
    const mesaj = get(offerResponse, 'response.ofertaResponse.mesaj', '');

    return { iban, codOferta, moneda, prima, eroare, mesaj };
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
        (msg) => { },
        (err) => { }
      );
  }

  makePayment(data) {
    return this.reqS.post<any>(this.endpoints.initiatePayment, data);
  }

  confirmPayment(token) {
    return this.reqS.get<any>(
      `${this.endpoints.confirmPayment}?urlHash=${token}`
    );
  }
}
