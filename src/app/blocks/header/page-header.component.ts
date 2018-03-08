import { Component, DoCheck, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { LoginModalService } from "../../modals/login";
import { AuthService, LocalizationService, UserService } from "../../services";
import { LANGUAGES } from "../../constants";

@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.less']
})
export class PageHeaderComponent implements OnInit, OnDestroy, DoCheck {
    public isMainPage: boolean = false;
    public isAuthorized: boolean = false;

    // For localization
    public dictionary: any = null;
    public language: string = null;
    public availableLanguages: any = LANGUAGES;

    private _subscriptions: Subscription[] = [];

    constructor(private _login: LoginModalService,
                private _userService: UserService,
                private _authService: AuthService,
                private _localizationService: LocalizationService) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;
        this.language = this._localizationService.currentLanguage;

        this._subscriptions.push(
            this._userService.user$
                .subscribe((user) => {
                    this.isAuthorized = !!user;
                })
        );
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach(s => s.unsubscribe());
    }

    ngDoCheck(): void {
        this.isMainPage = window.location.pathname === "/";
    }

    public logOut() {
        this._authService.logOut()
            .first()
            .subscribe((res) => {
                if (res) {
                    this._userService.setUser(null);
                }
            });
    }

    public openLoginModal(): void {
        this._login.openModal()
    }

    public changeLanguage(language: string): void {
        this._localizationService.setLocalization(language);
    }
}
