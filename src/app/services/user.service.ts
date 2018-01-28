import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { LOG_OUT, SIGN_IN, SIGN_UP, USER_INFO } from "../constants/api.constant";
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

    public loginUser(dataUser: any): void {

        this.http.post(SIGN_IN, dataUser)
            .subscribe((res: any) => {
                if (res.success) {
                    this.getUserInfo();
                } else {
                    alert(res.errorMessage);
                }

            });

    }

    public logOut(): void {
        this.http.post(LOG_OUT,{})
            .subscribe((res: any) => {
                if (res.success === true) {
                    this.setUser(null);
                }
            });
    }

    public registerUser(dataUser: any): void {

        this.http.post(SIGN_UP, dataUser)
            .subscribe((res: any) => {
                if (res.success) {
                    this.loginUser(dataUser);
                } else {
                    alert(res.errorMessage);
                }
            });

    }

}
