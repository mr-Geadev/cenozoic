import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {USER_INFO} from '../const/api.constant';
import {SystemMessageService} from './system-message.service';

@Injectable()
export class UserService {

    private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
    public user$: Observable<any> = this.userSubject.asObservable();

    constructor(private http: HttpClient,
                private _systemMessages: SystemMessageService) {
    }

    public setUser(user: any): void {
        this.userSubject.next(user);
    }

    public getUserInfo(): Observable<boolean> {
        this.http.get(USER_INFO)
            .subscribe(
                (res: any) => {
                    this.setUser(res.user);
                },
                (err: any) => {
                    this.setUser(null);
                }
            );

        return this.http.get(USER_INFO)
            .map(
                (res: any) => true,
                (err: any) => false
            );
    }

    public isType(type: string): boolean {

        if (this.getUser()) {
            return this.getUser().typeAccount === type;
        } else {
            return false;
        }
    }

    public isLogIn(): boolean {
        return this.getUser();
    }

    public isManagement(): boolean {
        if (this.getUser()) {
            return this.getUser().typeAccount === 'admin' || this.getUser().typeAccount === 'manager';
        } else {
            return false;
        }
    }

    public getUser(): any {
        return this.userSubject.value;
    }

    public sendRequestVerify(body: FormData) {
        return this.http.post('/api/v1/user/verification-request/create', body);
    }


}
