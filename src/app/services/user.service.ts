import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { USER_INFO } from "../constants/api.constant";
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
}
