import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/core/services/request/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { documenteEndpoints } from 'src/app/core/configs/endpoints';

@Injectable({
  providedIn: 'root'
})
export class DocumenteService {
  documents = []
  endpoints = documenteEndpoints;
  constructor(private reqS: RequestService) { }

  GetAllDocumentsForCurrentUser(){
    return this.reqS.get(this.endpoints.GetAllDocumentsForCurrentUser)
    // .pipe(
    //   catchError((e) => {
    //     return of(this.documents);
    //   })
    // );
  }
}
