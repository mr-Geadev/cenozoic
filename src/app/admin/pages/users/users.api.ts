import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserModel} from '../../../models/user.model';
import {SystemMessageService} from '../../../services';

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
                (err) => console.log(err)
            );
    }

    public banUser(id: string): Observable<any> {
        return this._http.get(`/api/v1/admin/account/block?uid=${id}`)
            .map(
                res => true,
                err => err
            );
    }

}