import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { AnalyticsApi } from 'api/index';
import * as moment from 'moment';
import { debounceTime, map, tap } from 'rxjs/operators';
import { ConfirmService } from '../../../../services/confirm.service';
import { UserModel } from '../../../../models/user.model';
import { SystemMessageService, UserService } from '../../../../services/index';
import { UsersApi } from '../../users/users.api';

@Component({
  selector: 'worker-analytics',
  templateUrl: 'worker-analytics.component.html',
  styleUrls: ['./worker-analytics.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class WorkerAnalyticsComponent implements OnInit, OnChanges {

  @Input() user: UserModel;


  minDate = moment([2017, 0, 1]);
  maxDate = moment().add(1, 'd');

  timePeriod = new FormGroup({
    from: new FormControl(null),
    to: new FormControl(null),
  });

  readonly changeForm$ = this.timePeriod.valueChanges.pipe(
    map(val => {
      if (val.from && val.to && val.from.isAfter(val.to)) {
        this.timePeriod.patchValue({
          from: val.to,
          to: val.from,
        }, {emitEvent: false});

        return {
          from: val.to,
          to: val.from,
        }
      }

      return val;
    }),
    debounceTime(1000),
    tap(val => {
      const filter = {};

      if (val.from) {
        Object.assign(filter, { from: val.from.format('YYYY-MM-DD') });
      }

      if (val.to) {
        Object.assign(filter, { to: val.to.format('YYYY-MM-DD') });
      }

      this.analyticsApi.dateFilter.next(filter);

      this.getStatWorkerViewVacancyPerDay();
    }),
  );

  resetFilter() {
    this.timePeriod.reset();
  }

  public statWorkerViewVacancyPerDay: any[] = [];

  constructor(public analyticsApi: AnalyticsApi) {
  }

  public ngOnInit() {
  }

  public ngOnChanges() {
    this.analyticsApi.dateFilter.next({});
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
