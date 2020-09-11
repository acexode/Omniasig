import { get } from 'lodash';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { locuinteEndpoints } from 'src/app/core/configs/endpoints';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocuinteService {
  singleLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  multipleLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  locuinteStore$: BehaviorSubject<Array<Locuinte>> = new BehaviorSubject(null);
  streetStore$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  countyStore$: BehaviorSubject<Array<any>> = new BehaviorSubject(null);
  cityStore$: BehaviorSubject<Array<any>> = new BehaviorSubject(null);
  endpoints = locuinteEndpoints;
  emptyV: Array<Locuinte> = [];

  constructor(private reqS: RequestService, private authS: AuthService) {
    this.initData();
  }

  initData() {
    this.authS.getAccountData().subscribe((account) => {
      if (this.authS.accountActivated(account)) {
        this.loadAllData();
      } else {
        this.locuinteStore$.next([]);
      }
    });
  }

  loadAllData() {
    this.multipleLoading.next(true);
    this.getUserLocuinte().subscribe(
      (vals) => {
        if (vals) {
          this.locuinteStore$.next(vals.map((v) => this.mapToUIModel(v)));
        } else {
          this.locuinteStore$.next([]);
        }
      },
      () => {
        this.locuinteStore$.next(this.emptyV);
      },
      () => {
        this.multipleLoading.next(false);
      }
    );

    this.getCounties().subscribe((vals) => {
      if (vals instanceof Array && vals.length) {
        this.countyStore$.next(vals);
      } else {
        this.countyStore$.next([]);
      }
    });
  }

  getUserLocuinte() {
    return this.reqS.get<Array<Locuinte>>(this.endpoints.AlluserLocation).pipe(
      catchError((e) => {
        return of(this.emptyV);
      })
    );
  }

  getSingleUserLocuinta(id): Observable<Locuinte> {
    return this.reqS
      .get<Locuinte>(this.endpoints.singleLocation + '?id=' + id)
      .pipe(
        map((v) => this.mapToUIModel(v)),
        catchError((e) => {
          return of(null);
        })
      );
  }

  getSingleLocuinta(id) {
    return this.locuinteStore$.pipe(
      switchMap((vals) => {
        if (vals instanceof Array) {
          const existing = vals.find((v) => v.id.toString() === id.toString());
          if (existing) {
            return of(existing);
          } else {
            return this.getSingleUserLocuinta(id);
          }
        } else {
          return this.getSingleUserLocuinta(id);
        }
      })
    );
  }

  addSingleLocuinte(data: Locuinte) {
    const adddress = {
      id: 0,
      ...data,
    };

    return this.reqS.post<Locuinte>(this.endpoints.add, adddress);
  }

  makeHomeAddress(data) {
    return this.reqS.post<Locuinte>(this.endpoints.makeHomeAddress, data);
  }

  updateSingleLocuinte(data: Locuinte) {
    return this.reqS.post<Locuinte>(this.endpoints.updateAddress, data);
  }

  getLocuinteWithPolicy(policyTypeID: string) {
    return this.reqS.get<Array<Locuinte>>(this.endpoints.base).pipe(
      map((v) => {
        if (!v) {
          return null;
        }
        const data = v.map((vals) =>
          vals.policyData.map(
            (dataV) => dataV.id.toString() === policyTypeID.toString()
          )
        );
        return data;
      }),
      catchError((e) => {
        return of(this.emptyV);
      })
    );
  }

  disableLocationForAddressId(addressId) {
    return this.reqS.post<Locuinte>(this.endpoints.disAbleLocation, addressId);
  }

  getCounties() {
    const data = {
      countryId: 'RO',
    };
    return this.countyStore$.pipe(
      take(1),
      switchMap((vals) => {
        if (vals === null) {
          return this.reqS
            .post<Locuinte>(this.endpoints.getCounties, data)
            .pipe(
              catchError((err) => {
                return of(null);
              })
            );
        } else {
          return of(vals);
        }
      })
    );
  }

  getCities(countryId) {
    const data = {
      countyId: countryId,
      countryId: 'RO',
    };

    return this.reqS.post<Locuinte>(this.endpoints.getCities, data);
  }

  getStreets(obj) {
    return this.reqS.post(this.endpoints.getStreets, obj).pipe(
      map((val: any) => {
        const withLabel = val.map((v) => {
          return {
            ...v,
            label: v.name,
          };
        });
        this.streetStore$.next(withLabel);
        return withLabel;
      })
    );
  }

  mapToUIModel(entry: any): Locuinte {
    return {
      id: get(entry, 'id', null),
      name: get(entry, 'name', ''),
      address: {
        name: get(entry, 'name', ''),
        addressCounty: get(entry, 'addressCounty', ''),
        addressCity: get(entry, 'addressCity', ''),
        addressStreet: get(entry, 'addressStreet', ''),
        addressBuildingNumber: get(entry, 'addressBuildingNumber', ''),
        // Scara bloc.
        addressScara: get(entry, 'addressScara', ''),
        addressFloor: get(entry, 'addressFloor', ''),
        addressApart: get(entry, 'addressApart', ''),
        addressPostalCode: get(entry, 'addressPostalCode', ''),
      },

      info: {
        type: get(entry, 'type', ''),
        structure: get(entry, 'structure', ''),
        yearConstruction: get(entry, 'yearConstruction', ''),
        valueCurrency: get(entry, 'valueCurrency', ''),
        valueSum: get(entry, 'valueSum', ''),
        occupancy: get(entry, 'occupancy', ''),
        usableSurface: get(entry, 'usableSurface', ''),
        heightRegime: get(entry, 'heightRegime', ''),
        rooms: get(entry, 'rooms', ''),
        hasAlarmSystem: get(entry, 'hasAlarmSystem', ''),
      },
      isDisabled: get(entry, 'isDisabled', ''),
    };
  }
}
