import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chat, Message, MessagesApi } from 'api/messages.api';
import { UserModel } from 'models';
import { LocalizationService, SystemMessageService, UserService } from 'services';
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

    console.log(this.id);

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

          if (this.id) {
            const newChat: Chat = this.chats.find(chat => chat.recipientId === this.id);
            if (newChat === undefined) {
              this.type = 'create';
            } else {
              this.currentChat = newChat;
            }
          }

          if (this.type === 'create') {
            this.currentChat = {
              _id: null,
              creatorId: null,
              recipientId: this.id,
              viewedCreator: true,
              viewedRecipient: true,
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
  }

  checkViewed(idChat) {
    this.messages.checkViewed(idChat).subscribe(() => {
      this.updateChats();
    });
  }

  sendMessage(uid: string) {
    if (this.type === 'create') { uid = this.id };
    this.messages.sendMessage(uid, this.newMessage)
      .subscribe((res) => {
        this.updateChats();
        this.newMessage = '';

        if (this.type === 'create') {
          this.type = 'open';
        }
      });
  }

}
