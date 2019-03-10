import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../../../models/user.model';
import { SystemMessageService } from '../../../services';

@Injectable()
export class UsersApi {

  public userList: UserModel[] = [];

  constructor(private _http: HttpClient,
              private _messages: SystemMessageService) {
  }

  public getUserList(): void {
    this.userList.length = 0;
    this._http.get('/api/v1/admin/users/info')
      .subscribe(
        (res) => res['users'].forEach(user => this.userList.push(new UserModel(user))),
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