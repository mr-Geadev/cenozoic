import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AnalyticsApi } from 'api';
import { ConfirmService } from '../../../../services/confirm.service';
import { UserModel } from '../../../../models/user.model';
import { SystemMessageService, UserService } from '../../../../services';
import { UsersApi } from '../users.api';

@Component({
  selector: 'worker-analytics',
  templateUrl: 'worker-analytics.component.html',
  styleUrls: ['./worker-analytics.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkerAnalyticsComponent implements OnInit, OnChanges {

  @Input() user: UserModel;

  public ngOnInit() {}

  public ngOnChanges() {}
}

interface Status {
  code: number;
  description: string;
}
