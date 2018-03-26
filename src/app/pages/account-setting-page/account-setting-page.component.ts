import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'account-setting-page',
    templateUrl: './account-setting-page.component.html',
    styleUrls: ['./account-setting-page.component.less']
})
export class AccountSettingPageComponent implements OnInit {

    public typeCurrentUser: string = null;

    constructor(private _userService: UserService) {
    }

    public ngOnInit() {
        this._userService.user$
            .subscribe(
                (user) => user ? this.typeCurrentUser = user.typeAccount : null
            )
    }

}