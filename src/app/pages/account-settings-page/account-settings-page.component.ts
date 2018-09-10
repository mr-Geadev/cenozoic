import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { LocalizationService } from "../../services";
import { UserService } from "../../services/user.service";
import "rxjs/add/operator/pairwise";
import "rxjs/add/operator/filter";

@Component({
    selector: 'account-setting-page',
    templateUrl: './account-settings-page.component.html',
    styleUrls: ['./account-settings-page.component.less']
})
export class AccountSettingsPageComponent implements OnInit {

    public typeCurrentUser: string = null;
    public dictionary: any = null;

    constructor(private _userService: UserService,
                private _router: Router,
                private _localizationService: LocalizationService) {
    }

    public ngOnInit() {
        this.dictionary = this._localizationService.currentDictionary;
        this._userService.user$
            .subscribe(
                (user) => user ? this.typeCurrentUser = user.typeAccount : null
            )
    }

}