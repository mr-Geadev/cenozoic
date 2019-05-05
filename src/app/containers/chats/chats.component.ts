import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat, MessagesApi, Recipient } from 'api/messages.api';
import { UserModel } from 'models';
import { BehaviorSubject } from 'rxjs';
import { LocalizationService, UserService } from 'services';
import * as moment from 'moment';

@Component({
	selector: 'chats',
	templateUrl: './chats.component.html',
	styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit, OnChanges {

	moment = moment;

	@Input('userId') id = null;

	public currentUser: UserModel = null;
	public currentChat: Chat = null;
	public chats: Chat[] = [];
	public dictionary: any = {};
	public newMessage: string = '';
	public type: string = 'open';

	isChatOpen = new BehaviorSubject(false);

	constructor(private router: Router,
							private userService: UserService,
							private messages: MessagesApi,
							private _localizationService: LocalizationService) {
	}

	public ngOnInit() {
		this._localizationService.currentDictionary
			.subscribe(
				res => {
					this.dictionary = res;
				},
			);

		this.userService.user$
			.subscribe((user) => {
				if (user) {
					this.currentUser = user;
					this.updateChats();
				}
			});
	}

	updateChats() {
		this.messages.getMessages()
			.subscribe(
				res => {
					this.chats = res.map(chat => {
						if (chat.creatorId !== this.currentUser._id) {
							const a = chat.creator;
							chat.creator = chat.recipient;
							chat.recipient = a;
						}

						return chat;
					});

					if (this.currentChat) {
						this.currentChat = this.chats.find(chat => chat._id === this.currentChat._id);

						if (this.currentChat.creatorId !== this.currentUser._id) {
							const b = this.currentChat.creatorId;
							this.currentChat.creatorId = this.currentChat.recipientId;
							this.currentChat.recipientId = b;
						}
					}

					if (this.id) {
						const newChat: Chat = this.chats.find(chat => chat.recipientId === this.id);
						if (newChat === undefined) {
							this.type = 'create';
						} else {
							this.currentChat = newChat;

							// по умолчанию текущий юзер всегда creator
							if (this.currentChat.creatorId !== this.currentUser._id) {
								const a = this.currentChat.creator;
								const b = this.currentChat.creatorId;

								this.currentChat.creator = this.currentChat.recipient;
								this.currentChat.creatorId = this.currentChat.recipientId;

								this.currentChat.recipient = a;
								this.currentChat.recipientId = b;
							}
						}
					}

					if (this.type === 'create') {
						this.currentChat = {
							_id: null,
							creatorId: null,
							recipientId: this.id,
							viewedCreator: true,
							viewedRecipient: true,
							recipient: {
								fullName: this.dictionary.NEW_MESSAGE
							},
							messages: [],
							changeDate: null,
							creationDate: null,
						};
					}
				},
			);
	}

	ngOnChanges() {
	}

	openChat(chat: Chat) {
		this.currentChat = chat;
		this.type = 'open';
		this.checkViewed(chat._id);

		this.isChatOpen.next(true);

		if (this.currentChat.creatorId !== this.currentUser._id) {
			const b = this.currentChat.creatorId;
			this.currentChat.creatorId = this.currentChat.recipientId;
			this.currentChat.recipientId = b;
		}
	}

	checkViewed(idChat) {
		this.messages.checkViewed(idChat).subscribe(() => {
			this.updateChats();
		});
	}

	sendMessage(uid: string) {
		if (this.type === 'create') {
			uid = this.id;
		}

		this.messages.sendMessage(uid, this.newMessage)
			.subscribe((res) => {
				this.updateChats();
				this.newMessage = '';

				if (this.type === 'create') {
					this.type = 'open';
				}
			});
	}

	name(recipient: Recipient) {
		return recipient.companyName || recipient.fullName || null;
	}

}
