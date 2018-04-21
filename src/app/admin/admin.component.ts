import { Component, OnInit } from '@angular/core';

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

    constructor() {
    }

    public ngOnInit() {
    }

}
