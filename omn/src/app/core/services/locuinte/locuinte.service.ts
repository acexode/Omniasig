import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { locuinteEndpoints } from '../../configs/endpoints';
import { Locuinte } from 'src/app/shared/models/data/locuinte';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocuinteService {
  constructor(private reqS: RequestService) {}
  endpoints = locuinteEndpoints;

  getUserLocuinte() {
    const emptyV: Array<Locuinte> = [];
    return this.reqS.get<Array<Locuinte>>(this.endpoints.base).pipe(
      catchError((e) => {
        return of(emptyV);
      })
      // map((pv) => (pv ? pv.map((pvi) => this.mapPolicyType(pvi)) : []))
    );
  }
}
