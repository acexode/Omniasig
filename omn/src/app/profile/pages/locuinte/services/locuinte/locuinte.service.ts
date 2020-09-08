import { serverBaseUrl } from './../../../../../core/configs/endpoints';
import { environment } from './../../../../../../environments/environment.test';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { locuinteEndpoints } from 'src/app/core/configs/endpoints';
import { RequestService } from 'src/app/core/services/request/request.service';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import { random } from 'lodash';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
 // https://omn-core-dev.azure.softescu.com/api/...
 // https://meet.google.com/linkredirect?authuser=2&dest=https%3A%2F%2Fomn-core-dev.azure.softescu.com%2Findex.html
export class LocuinteService {
  singleLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  multipleLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  locuinteStore$: BehaviorSubject<Array<Locuinte>> = new BehaviorSubject(null);
  streetStore$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  allStreets = this.streetStore$.asObservable();
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
          this.locuinteStore$.next(vals);
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
  }

  getUserLocuinte() {
    return this.reqS.get<Array<Locuinte>>(this.endpoints.AlluserLocation).pipe(
      catchError((e) => {
        return of(this.emptyV);
      })
    );
  }

  getSingleUserLocuinta(id): Observable<Locuinte> {
    return this.reqS.get<Locuinte>(this.endpoints.base + '/' + id).pipe(
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
      // return this.reqS.get(this.endpoints.add)
    return of({ ...data, ...{ id: random(10, 100) } }).pipe(
      map((v) => {
        const vals = this.locuinteStore$.value ? this.locuinteStore$.value : [];
        vals.push(v);
        this.locuinteStore$.next(vals);
        return v ? v : null;
      }),
      catchError((err) => of(null))
    );
  }
  updateSingleLocuinte(data: Locuinte) {
    return this.reqS.post<Locuinte>(this.endpoints.updateAddress, data);
    // return of(data).pipe(
    //   map((v) => {
    //     if (!v) {
    //       return null;
    //     }
    //     const vals = this.locuinteStore$.value ? this.locuinteStore$.value : [];
    //     const existingI = vals.findIndex(
    //       (val) => val.id.toString() === data.id.toString()
    //     );

    //     if (existingI > -1) {
    //       vals[existingI] = v;
    //     } else {
    //       return null;
    //     }
    //     this.locuinteStore$.next(vals);
    //     return data;
    //   }),
    //   catchError((err) => {
    //     return of(null);
    //   })
    // );
  }

  getLocuinteWithPolicy(policyTypeID: string) {
    alert(policyTypeID);
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

    return this.reqS.post<Locuinte>(this.endpoints.getCounties, data);
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
        let withLabel = val.map(v => {
            return {
              ...v,
              label: v.name
            }
        })        
        this.streetStore$.next(withLabel);
        return withLabel;
      })
    );
  }
}
