import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material";
import { isWorker } from 'cluster';
import { RESPOND_STATUSES } from 'const';
import { RespondsApi } from "../../../../api";
import { RespondModel } from "../../../../models";
import { ConfirmService } from "../../../../services";

@Component({
  selector: 'main-status',
  templateUrl: './main-status.component.html',
  styleUrls: ['./main-status.component.scss'],
})
export class MainStatusComponent {

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

  public cancel() {
    this._confirm.confirm('Вы действительно хотите отменить?')
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
    this._confirm.confirm('Вы действительно хотите отправить в архив?')
      .subscribe((res) => {
        if (res) {
          this.respondsApi.sendToArchive(this.respond, this.typeUser);
        }
        this._dialog.closeAll();
      });
  }

}
