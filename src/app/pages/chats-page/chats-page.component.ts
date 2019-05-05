import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat, MessagesApi } from 'api/messages.api';
import { UserModel } from 'models';
import { LocalizationService, SystemMessageService, UserService } from 'services';
import * as moment from 'moment';

@Component({
	selector: 'chats-page',
	templateUrl: './chats-page.component.html',
	styleUrls: ['./chats-page.component.scss'],
})
export class ChatsPageComponent implements OnInit {

	public dictionary: any = {};
	public userId: string = null;

	constructor(
		private _localizationService: LocalizationService,
		private activateRoute: ActivatedRoute,
	) {
	}

	public ngOnInit() {
		this._localizationService.currentDictionary
			.subscribe(
				res => {
					this.dictionary = res;
				},
			);

		this.activateRoute.params
			.subscribe((params) => {
				this.userId = params['id'];
			});
	}
}
