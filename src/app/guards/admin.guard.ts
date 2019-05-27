import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {UserService} from '../services/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private userService: UserService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.userService.isType('admin') || this.userService.isType('manager')|| this.userService.isType('newsManager')|| this.userService.isType('resumeManager')) {
            return true;
        } else {
            this.router.navigate(['/']);
        }
    }
}
