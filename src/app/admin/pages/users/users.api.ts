import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../../../models/user.model';
import { SystemMessageService } from '../../../services';

@Injectable()
export class UsersApi {

  constructor(private _http: HttpClient,
              private _messages: SystemMessageService) {
  }

  public getUserList(): Observable<any> {
    return this._http.get('/api/v1/admin/users/info')
      .map(
        (res) => {
          const users = [];
          res['users'].forEach(user => users.push(new UserModel(user)))
          return users;
        },
        (err) => console.log(err),
      );
  }

  public getUser(id: string) {
    return this._http.get(`/api/v1/admin/user/info?userId=${id}`);
  }

  public banUser(id: string): Observable<any> {
    return this._http.get(`/api/v1/admin/account/block?uid=${id}`)
      .map(
        res => true,
        err => err,
      );
  }

  public unbanUser(id: string): Observable<any> {
    return this._http.get(`/api/v1/admin/account/unblock?uid=${id}`)
      .map(
        res => true,
        err => err,
      );
  }

  public verificateUser(id: string, verify: boolean): Observable<any> {
    const body = {
      userId: id,
      parameters: {
        verify: verify
      }
    };
    return this._http.post(`/api/v1/admin/account/change`, body)
      .map(
        res => true,
        err => err,
      );
  }

}