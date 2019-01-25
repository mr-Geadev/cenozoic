import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AnalyticsApi } from 'api';
import * as moment from 'moment';
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

  public statWorkerViewVacancyPerDay: any[] = [];

  constructor(public analyticsApi: AnalyticsApi) {
  }

  public ngOnInit() {}

  public ngOnChanges() {
    this.getStatWorkerViewVacancyPerDay();
  }

  getStatWorkerViewVacancyPerDay() {
    this.analyticsApi.statWorkerViewVacancyPerDay(this.user._id)
      .subscribe(
        res => {
          this.statWorkerViewVacancyPerDay = res.statistics.map(day => {
            return {
              name: moment(day.date).format('YY.MM.YY'),
              series: [
                { name: 'Просмотренно', value: day.count || 0 },
              ],
            };
          });
        },
      );
  }
}

interface Status {
  code: number;
  description: string;
}
