import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { LOG_OUT, SIGN_IN, SIGN_UP, USER_INFO } from "../constants/api.constant";
import { UserModel } from "../models/user.model";
import { SystemMessageService } from "./system-message.service";

@Injectable()
export class UserService {

    private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public user$: Observable<any> = this.userSubject.asObservable();

    constructor(private http: HttpClient,
                private _systemMessages: SystemMessageService) {
    }

    public setUser(user: any): void {
        this.userSubject.next(user);
    }

    public getUserInfo(): void {
        this.http.get(USER_INFO)
            .subscribe(
                (res: any) => {
                    this.setUser(res.user);
                },
                (err: any) => {
                    this.setUser(null);
                }
            );
    }

    public isType(type: string): boolean {

        if (this.getUser()) {
            return this.getUser().typeAccount === type;
        } else {
            return false
        }
    }

    public getUser(): any {
        return this.userSubject.value;
    }


}
