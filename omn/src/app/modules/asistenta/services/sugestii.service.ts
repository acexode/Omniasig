import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/core/services/request/request.service';
import { sugestii } from 'src/app/core/configs/endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SugestiiService {

    constructor( private reqS: RequestService ) { }

    postSugestii(data: {}): Observable <any> {
        return this.reqS.post( sugestii.base, data);
    }
}
