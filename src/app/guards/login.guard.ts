import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { LoginModalService } from "../modals/login";
import { SystemMessageService } from "../services";
import { UserService } from "../services/user.service";

@Injectable()
export class LogInGuard implements CanActivate {

    constructor(private userService: UserService,
                private _login: LoginModalService,
                private _message: SystemMessageService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userService.user$
            .map(user => {
                if (this.userService.isLogIn()) {
                    return true;
                }
                this.router.navigate(['/']);
                this._message.info('Пожалуйста авторизируйтесь');
            });
    }
}