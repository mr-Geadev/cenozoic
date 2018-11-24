import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {LoginModalService} from '../pop-ups/login/index';
import {SystemMessageService} from '../services/index';
import {UserService} from '../services/user.service';

@Injectable()
export class LogInGuard implements CanActivate {

    constructor(private userService: UserService,
                private _login: LoginModalService,
                private _message: SystemMessageService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userService.user$
            .filter(user => user !== undefined)
            .map(user => {
                if (user) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                }
            });
    }
}