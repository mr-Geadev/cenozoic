import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {LoginModalService} from '../../pop-ups/login';
import {AuthService, LocalizationService, UserService} from '../../services';
import {LANGUAGES} from '../../const';

@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit, OnDestroy, DoCheck {
    public isMainPage: boolean = false;
    public isAuthorized: boolean = false;
    public isMobileMenuOpen: boolean = false;
    public currentPage: string = null;
    public isAdmin: boolean = false;

    // For localization
    public dictionary: any = {};
    public language: string = null;
    public availableLanguages: any = LANGUAGES;

    private _subscriptions: Subscription[] = [];

    constructor(private _login: LoginModalService,
                private _userService: UserService,
                private _authService: AuthService,
                private router: Router,
                private _localizationService: LocalizationService) {

        router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.currentPage = event.url.split('/')[1];
            }
        });

    }

    ngOnInit(): void {
      this._localizationService.currentDictionary
        .subscribe(
          res => this.dictionary = res
        );
        this.language = this._localizationService.currentLanguage;

        this._subscriptions.push(
            this._userService.user$
                .subscribe((user) => {
                    this.isAuthorized = !!user;
                    if (this.isAuthorized) {
                        this.isAdmin = user.typeAccount === 'admin' || user.typeAccount === 'manager';
                    }
                })
        );
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach(s => s.unsubscribe());
    }

    ngDoCheck(): void {
        this.isMainPage = window.location.pathname === '/';
    }

    public logOut() {
        this.closeMobileMenu();
        this._authService.logOut()
            .first()
            .subscribe((res) => {
                if (res) {
                    this._userService.setUser(null);
                    this.isAdmin = false;
                }
            });
    }

    public openLoginModal(): void {
        this.closeMobileMenu();
        this._login.openModal();
    }

    public changeLanguage(language: string): void {
        this._localizationService.setLocalization(language);
    }

    public toggleMobileMenu(): void {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    public closeMobileMenu(): void {
        this.isMobileMenuOpen = false;
    }
}
