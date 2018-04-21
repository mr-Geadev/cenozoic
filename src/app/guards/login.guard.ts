import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { LoginModalService } from "../modals/login";
import { UserService } from "../services/user.service";

@Injectable()
export class LogInGuard implements CanActivate {

    constructor(private userService: UserService,
                private _login: LoginModalService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.userService.isLogIn()) {
            return true;
        } else {
            this.router.navigate(['/']);
            this._login.openModal()
        }
    }
}