import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import "rxjs/add/operator/map";
import { SystemMessageService } from "../services/system-message.service";
import { UserService } from "../services/user.service";

@Injectable()
export class CreateResumeGuard implements CanActivate {

    private answer: boolean = false

    constructor(private userService: UserService,
                private msg: SystemMessageService,
                private router: Router) {
        this.userService.user$
            .subscribe(user => this.answer = !!user.fullName)
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.answer) {
            this.msg.info('Заполните личные данные в разделе настроек',4000);
            this.router.navigate(['/setting']);
        }
        return this.answer;
    }
}