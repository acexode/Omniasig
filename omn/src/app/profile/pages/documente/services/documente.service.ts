import { Injectable } from '@angular/core';
import { documenteEndpoints } from 'src/app/core/configs/endpoints';
import { RequestService } from 'src/app/core/services/request/request.service';
@Injectable({
  providedIn: 'root',
})
export class DocumenteService {
  documents = [];
  endpoints = documenteEndpoints;
  constructor(private reqS: RequestService) {}

  GetAllDocumentsForCurrentUser() {
    return this.reqS.get(this.endpoints.GetAllDocumentsForCurrentUser);
  }
  GetDocumentById(id) {
    return this.reqS.get(this.endpoints.GetDocumentById + '?documentId=' + id);
  }
}
