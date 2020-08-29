import { Injectable } from '@angular/core';
import {
  Router
} from '@angular/router';
import { authEndpoints } from 'src/app/core/configs/endpoints';
import { CustomStorageService } from 'src/app/core/services/custom-storage/custom-storage.service';
import { RequestService } from 'src/app/core/services/request/request.service';

@Injectable({
  providedIn: 'root',
})
export class ResetPincodeService {
  resetObj: { cnp: string, code: number, newPin: string }
  constructor(
    private storeS: CustomStorageService,
    private routerS: Router,
    private reqS: RequestService
  ) {
  }

  confirmResetPincode() {
    return this.reqS.post<any>(authEndpoints.confirmPincodeReset, this.resetObj)
  }

  setResetObj(obj: Object) {
    this.resetObj = { ...this.resetObj, ...obj }
  }

  clearResetObj(){
    this.resetObj = null
  }

  get getResetObj() {
    return this.resetObj
  }

  requestPincodeChange(cnp: string) {
    const reqBody = {
      cnp
    }
    return this.reqS.post<any>(authEndpoints.requestPincodeReset, reqBody)
  }
}
