import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/core/services/request/request.service';
import { authEndpoints } from 'src/app/core/configs/endpoints';
import { UpdatePassword } from '../models/UpdatePassword';

@Injectable({
  providedIn: 'root'
})
export class ChangeCodeService {
  private authEndpoints = authEndpoints;
  private changeCodeObj: UpdatePassword;

  constructor(
    private reqS: RequestService,
  ) { }

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
    return this.reqS.post<any>(this.authEndpoints.updatePassword, this.changeCodeObj);
  }
}
