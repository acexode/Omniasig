import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { authEndpoints } from '../../configs/endpoints';
import { Account } from '../../models/account.interface';
import { CustomStorageService } from '../custom-storage/custom-storage.service';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private userObj: Account;
  constructor(
    private storeS: CustomStorageService,
    private routerS: Router,
    private reqS: RequestService
  ) {
  }

  // confirmResetPincode() {
  //   return this.reqS.post<any>(authEndpoints.confirmPincodeReset, this.userObj)
  // }

  setUserObj(obj: object) {
    this.userObj = { ...this.userObj, ...obj };
  }

  clearUserObj() {
    this.userObj = null;
  }

  get getuserObj() {
    return this.userObj;
  }

  GetUserNameByPhoneNumber(phoneNumber: string) {
    return this.reqS.get<any>(`${authEndpoints.GetUserNameByPhoneNumber}?phoneNumber=${phoneNumber}`);
  }

  RegisterPhoneNumber(phoneNumber: string) {
    const reqBody = {
      phoneNumber
    };
    return this.reqS.post<any>(authEndpoints.RegisterPhoneNumber, reqBody);
  }

  ConfirmPhoneNumber(code: number) {
    const reqBody = {
      phoneNumber: this.userObj.phoneNumber,
      code
    };
    return this.reqS.post<any>(authEndpoints.ConfirmRegisterPhoneNumber, reqBody);
  }

  registerUser() {
    return this.reqS.post<any>(authEndpoints.RegisterUserProfile, this.userObj);

  }
}
