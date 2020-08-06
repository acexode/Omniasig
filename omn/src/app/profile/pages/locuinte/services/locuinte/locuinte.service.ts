import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { locuinteEndpoints } from 'src/app/core/configs/endpoints';
import { RequestService } from 'src/app/core/services/request/request.service';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';

@Injectable({
  providedIn: 'root',
})
export class LocuinteService {
  singleLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  multipleLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  locuinteStore$: BehaviorSubject<Array<Locuinte>> = new BehaviorSubject([]);
  endpoints = locuinteEndpoints;
  emptyV: Array<Locuinte> = [];

  constructor(private reqS: RequestService, private authS: AuthService) {
    this.initData();
  }

  initData() {
    this.authS.getAccountData().subscribe((account) => {
      if (this.authS.accountActivated(account)) {
        this.loadAllData();
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
    return this.reqS.get<Array<Locuinte>>(this.endpoints.base).pipe(
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
          const existing = vals.find((v) => v.id === id);
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
}
