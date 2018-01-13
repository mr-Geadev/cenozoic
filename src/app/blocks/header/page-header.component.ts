import { DoCheck, Component, OnInit } from '@angular/core';
import { LoginModalService } from "../../modals/login/login.service";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.less']
})
export class PageHeaderComponent implements DoCheck, OnInit {
    public path: any;

    public isAuthorized: boolean = false;

    constructor(public login: LoginModalService,
                public userService: UserService,) {
    }

    ngOnInit(): void {
        this.userService.user$
            .subscribe((user) => {
                this.isAuthorized = !!user;

                if (user) {
                    console.log(user);
                }
            });
    }

    ngDoCheck(): void {
        this.path = window.location.pathname;
        this.path = this.path == "/";
    }

    public openLoginModal(): void {
        this.login.openModal()
    }
}
