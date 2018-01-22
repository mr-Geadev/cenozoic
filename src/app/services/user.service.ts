import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { SIGN_IN, SIGN_UP, USER_INFO } from "../constants/api.constant";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {

    private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public user$: Observable<any> = this.userSubject.asObservable();


    constructor(private http: HttpClient) {
    }

    public setUser(user: any): void {
        this.userSubject.next(user);
    }

    public getUserInfo(): void {
        this.http.get(USER_INFO)
            .subscribe((res: any) => {
                this.setUser(res.user);
            });
    }

    public success: boolean  = false;

    public loginUser(dataUser: any): any {

        return this.http.post(SIGN_IN, dataUser)
            .subscribe((res: any) => {
                if (res.success) {
                    this.success = true;
                    this.getUserInfo();
                } else {
                    this.success = false;
                    alert(res.errorMessage);
                }

            });


    }

    public registerUser(dataUser: any): void {

        this.http.post(SIGN_UP, dataUser)
            .subscribe((res: any) => {
                if (res.success) {
                    // this._success = true;_success
                } else {
                    // this._success = false;_success
                    alert(res.errorMessage);
                }

                // return this._success;_success
            });

        // return this._success;_success

    }
}
