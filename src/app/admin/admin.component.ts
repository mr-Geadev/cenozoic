import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from '../services';

export const MENU_LIST = [
	{
		name: 'Главная',
		link: './',
	},
	{
		name: 'Пользователи',
		link: 'users',
		accessDenied: 'newsManager'
	},
	{
		name: 'Резюме',
		link: 'resumeList',
		accessDenied: 'newsManager'
	},
	{
		name: 'Города',
		link: 'cities',
		accessDenied: ''
	},
	{
		name: 'Новости',
		link: 'news',
		accessDenied: 'resumeManager'
	},
	{
		name: 'Локализация',
		link: 'localization',
		accessDenied: ''
	},
	{
		name: 'Баннеры',
		link: 'banners',
		accessDenied: 'resumeManager'
	},
	{
		name: 'Статичные страницы',
		link: 'static-page',
		accessDenied: ''
	},
	{
		name: 'Переписки',
		link: 'chats',
		accessDenied: ''
	},
	{
		name: 'Верификацию',
		link: 'verify-list',
		accessDenied: 'newsManager'
	},
	// {
	// name: 'Вакансии',
	// link: '#'
	// },
];

@Component({
	selector: 'admin-root',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

	public menuList: any = MENU_LIST;
	user;
	public currentRoute = new BehaviorSubject<string>('./');

	constructor(private _userService: UserService,
							private _router: Router) {
	}

	public ngOnInit() {

		this._userService.user$
			.subscribe(user => this.user = user);

		if (!(this._userService.isType('admin') || this._userService.isType('manager')|| this._userService.isType('newsManager')|| this._userService.isType('resumeManager'))) {
			this._router.navigate(['/']);
		}
	}

}
