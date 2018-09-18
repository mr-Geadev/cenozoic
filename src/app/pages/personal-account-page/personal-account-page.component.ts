import {Component, OnInit} from '@angular/core';
import {LocalizationService} from '../../services';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'personal-account-page',
    templateUrl: './personal-account-page.component.html',
    styleUrls: ['./personal-account-page.component.scss']
})
export class PersonalAccountPageComponent implements OnInit {

    public activeTab: string = null;
    public dictionary: any = null;
    public typeCurrentUser: string = null;

    constructor(private _localizationService: LocalizationService,
                private _userService: UserService) {
    }

    public ngOnInit(): void {

        this.dictionary = this._localizationService.currentDictionary;
        this.activeTab = this.dictionary.ACCOUNT_PAGE_TAB_RESPOND;

        this._userService.user$
            .subscribe(
                (user) => user ? this.typeCurrentUser = user.typeAccount : null
            );
    }

}