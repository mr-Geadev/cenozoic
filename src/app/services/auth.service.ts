import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { LOG_OUT, SIGN_IN, SIGN_UP } from "../constants/api.constant";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {

    constructor(private _http: HttpClient,
                private _userService: UserService) {
    }

    public loginUser(dataUser: any): Observable<any> {
        return this._http.post(SIGN_IN, dataUser)
    }

    public logOut(): Observable<boolean> {
        return this._http.post(LOG_OUT, {})
            .map(res => res['success']);
    }

    public registerUser(dataUser: any): Observable<any> {
        return this._http.post(SIGN_UP, dataUser);
    }

}