import { Component, Input } from '@angular/core';
import { RESPOND_STATUSES } from 'const';

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

  public isWorker(): boolean {
    return this.typeUser === 'worker';
  }

  public isOffer(): boolean {
    return this.entity === 'offer';
  }

  constructor() {
  }

}
