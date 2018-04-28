import { Component, OnInit } from "@angular/core";
import { LocalizationService } from "../../services";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'account-setting-page',
    templateUrl: './account-setting-page.component.html',
    styleUrls: ['./account-setting-page.component.less']
})
export class AccountSettingPageComponent implements OnInit {

    public typeCurrentUser: string = null;
    public dictionary: any = null;

    constructor(private _userService: UserService,
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