import { Component, Input } from '@angular/core';
import { RESPOND_STATUSES } from 'const';
import { RespondModel } from 'models';
import { PopupsService } from '../../../../services/popups.service';

@Component({
  selector: 'detailed-status',
  templateUrl: './detailed-status.component.html',
  styleUrls: ['./detailed-status.component.scss'],
})
export class DetailedStatusComponent {

  public RESPOND_STATUS = RESPOND_STATUSES;

  @Input('typeUser') typeUser: string;
  @Input('status') status: string;
  @Input('entity') entity: string;
  @Input('dictionary') dictionary: any;
  @Input('respond') respond: RespondModel;

  constructor(private _popups: PopupsService) {
  }

  public isWorker(): boolean {
    return this.typeUser === 'worker';
  }

  public isBig(): boolean {
    if (this.isWorker()) {
      if (this.entity === 'respond') {
        return true;
      }
    } else {
      if (this.entity === 'offer') {
        return true;
      }
    }

    return false;
  }

  public answer() {
    if (this.isWorker()) {
      this._popups.answerToOffer(this.respond);
    } else {
      this._popups.answerToRespond(this.respond);
    }
  }

  public changeStatus() {
    this._popups.answerToRespond(this.respond);
  }

}
