import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {SystemMessageService} from '../services/index';
import {UserService} from '../services/user.service';

@Injectable()
export class NotWorkerGuard implements CanActivate {

    constructor(private userService: UserService,
                private router: Router,
                private _message: SystemMessageService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userService.user$
            .filter(user => !!user)
            .map(user => {
                if (this.userService.isType('worker')) {
                    this._message.info('Действие не доступно для вашего аккаунта');
                    this.router.navigate(['/personal-account']);
                } else {
                    return true;
                }
            });
    }
}