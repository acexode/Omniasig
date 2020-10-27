import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/core/services/request/request.service';
import { phoneNumberEndPoints } from 'src/app/core/configs/endpoints';
import { ConfirmNewPhoneNumber } from './../models/ConfirmNewPhoneNumber.interface';
import { RequestNewPhoneNumberChange } from './../models/RequestNewPhoneNumberChange.interface';
@Injectable({
  providedIn: 'root',
})
export class PhonenumberService {
  constructor(private reqS: RequestService) {}

  updatePhoneNumber(data: RequestNewPhoneNumberChange): Observable<any> {
    return this.reqS.post<any>(
      phoneNumberEndPoints.RequestNewPhoneNumberChange,
      data
    );
  }
  validatePhoneCode(data: ConfirmNewPhoneNumber): Observable<any> {
    return this.reqS.post<any>(
      phoneNumberEndPoints.ConfirmNewPhoneNumber,
      data
    );
  }
}
