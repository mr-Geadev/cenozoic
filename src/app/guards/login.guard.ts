import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {LoginModalService} from '../modals/login';
import {SystemMessageService} from '../services';
import {UserService} from '../services/user.service';

@Injectable()
export class LogInGuard implements CanActivate {

    private init: boolean = false;

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
                    this._message.info('Для просмотра данной страницы необходимо авторизироваться');
                    this.router.navigate(['/']);
                }
            });
    }
}