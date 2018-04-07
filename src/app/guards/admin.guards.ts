import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { UserService } from "../services/user.service";

@Injectable()
export class AdminGuards implements CanActivate {

    constructor(private userService: UserService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userService.user$
            .filter(user => !!user)
            .map(user => {
                if (user._id !== '5aa5718520189420bfa91aea') {
                    this.router.navigate(['/']);
                }

                return true;
            });
    }
}