import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ChatComponent } from 'faq/chat';
import { LocalizationService } from 'services';
import * as moment from 'moment';

@Component({
  selector: 'list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss'],
})
export class ListQuestionComponent {

  @Input('list') list;

  constructor(private dialog: MatDialog) {}

  public openChat(id): void {
    this.dialog.open(ChatComponent, {
      width: '878px',
      height: '546px',
      panelClass: 'custom-dialog-container',
      data: { id }
    } as MatDialogConfig);
  }

  public timeCreation(time) {
    const local = LocalizationService.currentLang();
    return moment(time).locale(local).format('HH:mm, DD MMMM  YYYY');
  }
}
