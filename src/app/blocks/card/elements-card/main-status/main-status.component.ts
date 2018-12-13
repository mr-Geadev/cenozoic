import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RESPOND_STATUSES } from 'const';
import { RespondsApi } from '../../../../api';
import { RespondModel } from '../../../../models';
import { ConfirmService, LocalizationService } from '../../../../services';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'main-status',
  templateUrl: './main-status.component.html',
  styleUrls: ['./main-status.component.scss'],
})
export class MainStatusComponent implements OnInit {

  public RESPOND_STATUS = RESPOND_STATUSES;

  @Input('typeUser') typeUser: string;
  @Input('status') status: string;
  @Input('entity') entity: string;
  @Input('viewed') viewed: string;
  @Input('dictionary') dictionary: any;
  @Input('respond') respond: RespondModel;

  public isWorker(): boolean {
    return this.typeUser === 'worker';
  }

  public isOffer(): boolean {
    return this.entity === 'offer';
  }

  public archived(): boolean {
    if ((this.typeUser === 'worker') && this.respond.workerArchive) return true;
    if ((this.typeUser === 'employer') && this.respond.employerArchive) return true;
  }

  constructor(private respondsApi: RespondsApi,
              private _dialog: MatDialog,
              private _confirm: ConfirmService) {
  }

  ngOnInit() {

  }

  public cancel() {
    this._confirm.confirm(this.dictionary.APPROVED_MESSAGE_CANCEL)
      .subscribe((res) => {
        if (res) {
          if (this.isWorker()) {
            this.respondsApi.cancelRespond(this.respond._id);
          }
        }
        this._dialog.closeAll();
      });
  }

  public archive() {
    this._confirm.confirm(this.dictionary.APPROVED_MESSAGE_ARCHIVE)
      .subscribe((res) => {
        if (res) {
          this.respondsApi.sendToArchive(this.respond, this.typeUser);
        }
        this._dialog.closeAll();
      });
  }

  public lastUpdate() {
    let local = LocalizationService.currentLang();
    if (this.respond.changeDate) {
      return this.respond.changeDate.locale(local).fromNow();
    }
    return this.respond.creationDate.locale(local).fromNow();
  }

}
