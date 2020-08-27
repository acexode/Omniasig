import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { authEndpoints } from '../../configs/endpoints';
import { Account } from '../../models/account.interface';
import { LoginResponse } from '../../models/login-response.interface';
import { Login } from '../../models/login.interface';
import { CustomStorageService } from '../custom-storage/custom-storage.service';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  userObj: Account = {
    name: 'string',
    surname: 'string',
    cnp: 'string',
    isPublicPerson: true,
    userName: 'string',
    email: 'user@example.com',
    phoneNumber: 'string',
    dateBirth: '2020-08-26T16:40:21.196Z',
    marketing: true,
    pin: 0,
    roles: [],
  };
  constructor(
    private storeS: CustomStorageService,
    private routerS: Router,
    private reqS: RequestService
  ) {}

  // makes http call to server
  login(loginData: { phone: string; password: any; aRoute: string }) {
    const reqData: Login = {
      email: loginData.phone,
      password: loginData.password,
    };
    return this.reqS.post<LoginResponse>(authEndpoints.login, reqData);
  }

  // get user profile from ws
  // getProfile(token,phoneNumber){
  //   return this.reqS.get<Account>(`${authEndpoints.getUserProfile}?userNameOrId=${phoneNumber}`).pipe(
  //     switchMap((res)=>{
  //       return this.processAuthResponse({account:{...res,userStates: []},token});
  //     })
  //   )
  // }
}
