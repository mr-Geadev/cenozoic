import { Component, Input } from '@angular/core';
import { RESPOND_STATUSES } from 'const';

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

  constructor() {
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

}
