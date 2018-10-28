import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ChatComponent {

  constructor(private dialog: MatDialog) {
  }

  closeChat() {
    this.dialog.closeAll();
  }
}
