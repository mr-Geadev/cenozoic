import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services';

export const MENU_LIST = [
    {name: 'Главная', link: './'},
    {name: 'Пользователи', link: 'users'},
    {name: 'Резюме', link: 'resumeList'},
    {name: 'Настройки', link: 'settings'},
    {name: 'Новости', link: 'news'},
    {name: 'Локализация', link: 'localization'},
    {name: 'Баннеры', link: 'banners'},
    {name: 'Статистика по сайту', link: 'statistic'},
    {name: 'Статичные страницы', link: 'static-page'},
    // {name: 'Вакансии', link: '#'},
];

@Component({
    selector: 'admin-root',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    public menuList: any = MENU_LIST;

    constructor(private _userService: UserService,
                private _router: Router) {
    }

    public ngOnInit() {
        if (!(this._userService.isType('admin') || this._userService.isType('manager'))) {
            this._router.navigate(['/']);
        }
    }

}
