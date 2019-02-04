import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ChatComponent } from 'support/chat';
import { LocalizationService } from 'services';
import * as moment from 'moment';

@Component({
  selector: 'list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss'],
})
export class ListQuestionComponent implements OnInit  {

  @Input('list') list;
  public dictionary: any = {};

  constructor(private dialog: MatDialog,
              private _localizationService: LocalizationService) {}

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

  ngOnInit() {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );
  }
}
