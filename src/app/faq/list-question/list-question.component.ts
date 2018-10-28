import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ChatComponent } from 'faq/chat';

@Component({
  selector: 'list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss'],
})
export class ListQuestionComponent {

  constructor(private dialog: MatDialog) {}

  public openChat(): void {
    this.dialog.open(ChatComponent, {
      width: '878px',
      height: '546px',
      panelClass: 'custom-dialog-container'
    } as MatDialogConfig);
  }
}
