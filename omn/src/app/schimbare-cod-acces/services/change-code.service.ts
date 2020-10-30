import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { authEndpoints } from 'src/app/core/configs/endpoints';
import { RequestService } from 'src/app/core/services/request/request.service';
import { UpdatePassword } from '../models/UpdatePassword';
import { AuthService } from './../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChangeCodeService {
  private authEndpoints = authEndpoints;
  private changeCodeObj: UpdatePassword;

  constructor(private reqS: RequestService, private authS: AuthService) {}

  public setUpdatePassObj(obj: UpdatePassword) {
    this.changeCodeObj = { ...this.changeCodeObj, ...obj };
  }

  public clearUpdatePassObj() {
    this.changeCodeObj = null;
  }

  public get getUpdatePassObj() {
    return this.changeCodeObj;
  }

  public changeAccessCode() {
    return this.reqS
      .post<any>(this.authEndpoints.updatePassword, this.changeCodeObj)
      .pipe(
        switchMap(() => {
          return this.authS.updatePassInStore(this.changeCodeObj.newPassword);
        })
      );
  }
}
