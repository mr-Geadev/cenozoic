import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { LocalizationService, SystemMessageService } from 'services';
import 'rxjs-compat/add/operator/share';
import { environment } from '../../environments/environment';

@Injectable()
export class MessagesApi {

  url = environment.apiUrl;

  public dictionary: any = {};

  constructor(private http: HttpClient,
              private _localizationService: LocalizationService,
              private messages: SystemMessageService) {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );
  }

  sendMessage(userId: string, message: string) {
    return this.http.post(this.url + '/api/v1/message/create', {
      message: {
        userId,
        message,
      },
    });
  }

  getMessages() {
    return this.http.get<{messages: Chat[]}>(this.url + '/api/v1/user/message/get/all').pipe(
      map($0 => $0.messages)
    );
  }

  checkViewed(messageId: string) {
    return this.http.get(this.url + `/api/v1/user/message/view?messageId=${messageId}`);
  }
}

export interface Message {
  creatorId: string;
  message: string;
  date: string;
}

export interface Recipient {
  companyName?: string;
  fullName?: string;
  typeAccount?: string;
}

export interface Chat {
  _id: string;
  creatorId: string;
  creator?: Recipient;
  recipientId: string;
  recipient?: Recipient;
  viewedCreator: boolean;
  viewedRecipient: boolean;
  messages: Message[];
  changeDate: string;
  creationDate: string;
}
