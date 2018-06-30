import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SystemMessageService} from './system-message.service';
import {UserService} from './user.service';

@Injectable()
export class BlankAccountService {

    public isProtector: boolean = false;

    constructor(private userService: UserService,
                private msg: SystemMessageService,
                private _router: Router) {
    }

    public goFilled(): void {
        this.msg.info('Заполните личные данные в разделе настроек', 4000);
        this._router.navigate(['/setting']);
        this.isProtector = true;
    }

    public compleateFilled(typeAccount): void {
        this.isProtector = false;
        this.userService.getUserInfo()
            .subscribe(
                user => {
                    if (typeAccount === 'worker') {
                        this._router.navigate(['/create-resume']);
                    } else {
                        this._router.navigate(['/create-vacancy']);
                    }
                }
            );
    }
}
