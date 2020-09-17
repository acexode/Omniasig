import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/core/services/request/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { documenteEndpoints } from 'src/app/core/configs/endpoints';
import { File } from '@ionic-native/file/ngx';
@Injectable({
  providedIn: 'root'
})
export class DocumenteService {
  documents = []
  endpoints = documenteEndpoints;
  constructor(private reqS: RequestService) { }

  GetAllDocumentsForCurrentUser(){
    return this.reqS.get(this.endpoints.GetAllDocumentsForCurrentUser)
   
  }
  GetDocumentById(id){
    return this.reqS.get(this.endpoints.GetDocumentById + '?documentId=' + id)   
  }
}
