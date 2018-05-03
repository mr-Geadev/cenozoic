import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { BlankAccountService } from "../services/blank-account.service";
import { SystemMessageService } from "../services/system-message.service";
import { UserService } from "../services/user.service";

@Injectable()
export class BlankAccountGuard implements CanActivate {

    constructor(private userService: UserService,
                private blankAccountService: BlankAccountService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userService.user$
            .filter(user => !!user)
            .map(user => {
                if (!user.fullName) {
                    this.blankAccountService.goFilled();
                }

                return !!user.fullName;
            });
    }
}