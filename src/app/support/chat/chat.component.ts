import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SupportApi } from 'support/support.api';
import * as moment from 'moment';
import { LocalizationService, SocketService } from 'services';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ChatComponent implements OnInit {

  comments = [];
  newMessage = '';

  constructor(private dialog: MatDialog,
              private faqApi: SupportApi,
              private socket: SocketService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  closeChat() {
    this.dialog.closeAll();
  }

  public updateIssue() {
    this.faqApi.getOneIssue(this.data.id)
      .subscribe(
        res => { this.comments = res['issue'].comments; },
      );
  }

  ngOnInit() {
    this.updateIssue();

    this.socket.on('new-issue-comment').subscribe(
      (data) => {
        console.log('Success in chat', data);
        if (this.data.id === data.comment.issueId) {
          this.updateIssue();
        }
      },
      (error) => {
        console.log('Error', error);
      },
      () => {
        console.log('complete');
      });
  }

  sendMessage() {
    this.faqApi.sendMessage(this.data.id, this.newMessage)
      .subscribe( (res) => {
        this.updateIssue();
        this.newMessage = '';
      });
  }

  public timeCreation(time) {
    const local = LocalizationService.currentLang();
    return moment(time).locale(local).format('HH:mm, DD MMMM  YYYY');
  }
}
