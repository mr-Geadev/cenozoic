import { Component, DoCheck, OnInit } from "@angular/core";

import { LoginModalService } from "../../modals/login";
import { UserService } from "../../services";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.less']
})
export class PageHeaderComponent implements DoCheck, OnInit {
    public path: any;

    public isAuthorized: boolean = false;

    constructor(public login: LoginModalService,
                public _userService: UserService,
                public _authService: AuthService) {
    }

    ngOnInit(): void {
        this._userService.user$
            .subscribe((user) => {
                this.isAuthorized = !!user;
            });
    }

    ngDoCheck(): void {
        this.path = window.location.pathname;
        this.path = this.path == "/";
    }

    public logOut() {
        this._authService.logOut()
            .subscribe((res)=>{
                if (res) {
                    this._userService.setUser(null);
                }
            })
    }

    public openLoginModal(): void {
        this.login.openModal()
    }
}
