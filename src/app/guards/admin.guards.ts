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

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('test');
        // return this.userService.user$
        //     .filter(user => !!user)
        //     .map(user => {
        //         if (user.typeAccount !== 'admin') {
        //             this.router.navigate(['/']);
        //         }
        //         return true;
        //     });
        if (this.userService.isType('admin')) {
            return true;
        } else {
            this.router.navigate(['/']);
        }
    }
}