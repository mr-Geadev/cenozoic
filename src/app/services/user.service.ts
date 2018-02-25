import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { LOG_OUT, SIGN_IN, SIGN_UP, USER_INFO } from "../constants/api.constant";
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
            .subscribe((res: any) => {
                this.setUser(res.user);
                console.log(res.user);
            });
    }


}
