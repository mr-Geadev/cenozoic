import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "../../../models/user.model";

@Injectable()
export class UsersApi {

    public userList: UserModel[] = [];

    constructor(private _http: HttpClient) {
    }

    public getUserList():void {
        this._http.get('/api/v1/admin/users/info')
            .subscribe(
                (res) => res['users'].forEach(user => this.userList.push(new UserModel(user))),
                (err) => console.log(err)
            );
    }

}