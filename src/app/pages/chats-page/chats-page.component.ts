import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  moment = moment;

  public currentUser: UserModel = null;
  public currentChat: Chat = null;
  public chats: Chat[] = [];
  public dictionary: any = {};
  public newMessage: string = '';

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
        }
      });

    this.updateChats();
  }

  updateChats() {
    this.messages.getMessages()
      .subscribe(
        res => {
          this.chats = res;

          if (this.currentChat) {
            this.currentChat = this.chats.find(chat => chat._id === this.currentChat._id);
          }
        }
      );
  }

  openChat(chat: Chat) {
    this.currentChat = chat;
  }

  sendMessage(uid: string) {
    this.messages.sendMessage(uid, this.newMessage)
      .subscribe((res) => {
        this.updateChats();
        this.newMessage = '';
      });
  }

}
