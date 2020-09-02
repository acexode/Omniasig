import { Injectable } from '@angular/core';
import { authEndpoints } from 'src/app/core/configs/endpoints';
import { RequestService } from 'src/app/core/services/request/request.service';

@Injectable({
  providedIn: 'root',
})
export class ResetPincodeService {
  resetObj: { cnp: string; code: number; newPin: string };
  constructor(private reqS: RequestService) {}

  confirmResetPincode() {
    return this.reqS.post<any>(
      authEndpoints.confirmPincodeReset,
      this.resetObj
    );
  }

  setResetObj(obj: object) {
    this.resetObj = { ...this.resetObj, ...obj };
  }

  clearResetObj() {
    this.resetObj = null;
  }

  get getResetObj() {
    return this.resetObj;
  }

  requestPincodeChange(cnp: string) {
    const reqBody = {
      cnp,
    };
    return this.reqS.post<any>(authEndpoints.requestPincodeReset, reqBody);
  }
}
