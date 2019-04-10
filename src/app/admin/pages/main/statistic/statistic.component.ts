import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { AnalyticsApi } from 'api/index';
import * as moment from 'moment';
import { debounceTime, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'statistic.col',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
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
export class StatisticComponent implements OnInit {

  statCommonResumeViewBuyPerDay = [];
  statCommonNewRespondsPerDay = [];

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

      this.getAllStatistic();
    }),
  );

  resetFilter() {
    this.timePeriod.reset();
  }

  public attitudeRespondsTemplate = [
    { name: 'Ожидание', value: 0, active: true },
    { name: 'Ожидание опросника', value: 0, active: true },
    { name: 'Опросник заполнен', value: 0, active: true },
    { name: 'Принято', value: 0, active: true },
    { name: 'Отклонено', value: 0, active: true },
  ];
  public attitudeResponds = [
    { name: 'Ожидание', value: 1 },
    { name: 'Ожидание опросника', value: 2 },
    { name: 'Опросник заполнен', value: 3 },
    { name: 'Принято', value: 4 },
    { name: 'Отклонено', value: 5 },
  ];

  public attitudeOffersTemplate = [
    { name: 'Ожидание', value: 0, active: true },
    { name: 'Ожидание опросника', value: 0, active: true },
    { name: 'Опросник заполнен', value: 0, active: true },
    { name: 'Принято', value: 0, active: true },
    { name: 'Отклонено', value: 0, active: true },
  ];
  public attitudeOffers = [
    { name: 'Ожидание', value: 1 },
    { name: 'Ожидание опросника', value: 2 },
    { name: 'Опросник заполнен', value: 3 },
    { name: 'Принято', value: 4 },
    { name: 'Отклонено', value: 5 },
  ];

  statCommonNewNewsPerDay = [];

  statCommonNewBannersPerDay = [];

  constructor(private analyticsApi: AnalyticsApi) {}

  ngOnInit() {
    this.analyticsApi.dateFilter.next({});
    this.getAllStatistic();
  }

  getAllStatistic() {
    this.getStatCommonResumeViewBuyPerDay();
    this.getStatCommonNewRespondsPerDay();
    this.getAttitudeResponds();
    this.getAttitudeOffers();
    this.getStatCommonNewNewsPerDay();
    this.getStatCommonNewBannersPerDay();
  }

  getStatCommonResumeViewBuyPerDay() {
    this.analyticsApi.statCommonResumeViewBuyPerDay()
      .subscribe(res => {
        this.statCommonResumeViewBuyPerDay = res.statistics.map(day => {
          return {
            name: moment(day.date).format('DD.MM.YY'),
            series: [
              { name: 'Просмотренно', value: day.resumeViewCount || 0 },
              { name: 'Куплено', value: day.payResumeContactsCount || 0 },
            ],
          };
        });
      });
  }

  getStatCommonNewRespondsPerDay() {
    this.analyticsApi.statCommonNewRespondsPerDay()
      .subscribe(res => {
        this.statCommonNewRespondsPerDay = res.statistics.map(day => {
          return {
            name: moment(day.date).format('DD.MM.YY'),
            series: [
              { name: 'Создано', value: day.APPROVED + day.AWAITING + day.QUESTIONNAIRE_DONE + day.REJECTED },
            ],
          };
        });
      });
  }

  getAttitudeResponds() {
    this.analyticsApi.statCommonAttitudeRespondsStatusNow()
      .subscribe(
        res => {
          this.attitudeRespondsTemplate[0].value = res.statistics.AWAITING || 0;
          this.attitudeRespondsTemplate[1].value = res.statistics.WAIT_QUESTIONNAIRE || 0;
          this.attitudeRespondsTemplate[2].value = res.statistics.QUESTIONNAIRE_DONE || 0;
          this.attitudeRespondsTemplate[3].value = res.statistics.APPROVED || 0;
          this.attitudeRespondsTemplate[4].value = res.statistics.REJECTED || 0;
          this.updateAttitudeResponds();
        },
      );
  }

  updateAttitudeResponds() {
    this.attitudeResponds = [
      { name: 'Ожидание', value: this.attitudeRespondsTemplate[0].active ? this.attitudeRespondsTemplate[0].value : 0 },
      { name: 'Ожидание опросника', value: this.attitudeRespondsTemplate[1].active ? this.attitudeRespondsTemplate[1].value : 0 },
      { name: 'Опросник заполнен', value: this.attitudeRespondsTemplate[2].active ? this.attitudeRespondsTemplate[2].value : 0 },
      { name: 'Принято', value: this.attitudeRespondsTemplate[3].active ? this.attitudeRespondsTemplate[3].value : 0 },
      { name: 'Отклонено', value: this.attitudeRespondsTemplate[4].active ? this.attitudeRespondsTemplate[4].value : 0 },
    ];
  }

  getAttitudeOffers() {
    this.analyticsApi.statCommonAttitudeOffersStatusNow()
      .subscribe(
        res => {
          this.attitudeOffersTemplate[0].value = res.statistics.AWAITING || 0;
          this.attitudeOffersTemplate[1].value = res.statistics.WAIT_QUESTIONNAIRE || 0;
          this.attitudeOffersTemplate[2].value = res.statistics.QUESTIONNAIRE_DONE || 0;
          this.attitudeOffersTemplate[3].value = res.statistics.APPROVED || 0;
          this.attitudeOffersTemplate[4].value = res.statistics.REJECTED || 0;
          this.updateAttitudeOffers();
        },
      );
  }

  updateAttitudeOffers() {
    this.attitudeOffers = [
      { name: 'Ожидание', value: this.attitudeOffersTemplate[0].active ? this.attitudeOffersTemplate[0].value : 0 },
      { name: 'Ожидание опросника', value: this.attitudeOffersTemplate[1].active ? this.attitudeOffersTemplate[1].value : 0 },
      { name: 'Опросник заполнен', value: this.attitudeOffersTemplate[2].active ? this.attitudeOffersTemplate[2].value : 0 },
      { name: 'Принято', value: this.attitudeOffersTemplate[3].active ? this.attitudeOffersTemplate[3].value : 0 },
      { name: 'Отклонено', value: this.attitudeOffersTemplate[4].active ? this.attitudeOffersTemplate[4].value : 0 },
    ];
  }

  getStatCommonNewNewsPerDay() {
    this.analyticsApi.statCommonNewNewsPerDay()
      .subscribe(res => {
        this.statCommonNewNewsPerDay = res.statistics.map(day => {
          return {
            name: moment(day.date).format('DD.MM.YY'),
            series: [
              { name: 'Создано', value: day.count },
            ],
          };
        });
      });
  }

  getStatCommonNewBannersPerDay() {
    this.analyticsApi.statCommonNewBannersPerDay()
      .subscribe(res => {
        this.statCommonNewBannersPerDay = res.statistics.map(day => {
          return {
            name: moment(day.date).format('DD.MM.YY'),
            series: [
              { name: 'Создано', value: day.count },
            ],
          };
        });
      });
  }

}
