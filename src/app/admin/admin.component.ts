import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../services";

export const MENU_LIST = [
    {name: 'Главная', link: './'},
    {name: 'Пользователи', link: 'users'},
    {name: 'Резюме', link: 'resumeList'}
    // {name: 'Вакансии', link: '#'},
];

@Component({
    selector: 'admin-root',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

    public menuList: any = MENU_LIST;

    constructor(private _userService: UserService,
                private _router: Router) {
    }

    public ngOnInit() {
        if (!this._userService.isType('admin')) {
            this._router.navigate(['/']);
        }
    }

}
