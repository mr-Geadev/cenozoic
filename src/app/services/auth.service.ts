import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { LOG_OUT, SIGN_IN, SIGN_UP } from '../const/api.constant';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  url = environment.apiUrl;

  constructor(private _http: HttpClient,
              private _userService: UserService) {
  }

  public loginUser(dataUser: any): Observable<any> {
    return this._http.post(SIGN_IN, dataUser);
  }

  public logOut(): Observable<boolean> {
    return this._http.post(LOG_OUT, {})
      .map(res => res['success']);
  }

  public registerUser(dataUser: any): Observable<any> {
    return this._http.post(SIGN_UP, dataUser);
  }

  public sendLinkToRestorePassword(email: string) {
    return this._http.get(this.url + `/api/v1/user/get-password-token?email=${email}`);
  }

  saveNewPassword(token: string, newPassword: string) { //this.url +  /api/v1/user/password/reset
    return this._http.post(this.url + '/api/v1/user/password/reset', {
      changePasswordToken: token,
      newPassword: newPassword,
    });
  }
}
