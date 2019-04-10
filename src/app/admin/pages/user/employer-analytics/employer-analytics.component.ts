import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { AnalyticsApi } from 'api/index';
import * as moment from 'moment';
import { debounceTime, map, tap } from 'rxjs/operators';
import { UserModel } from '../../../../models/user.model';

@Component({
  selector: 'employer-analytics',
  templateUrl: 'employer-analytics.component.html',
  styleUrls: ['./employer-analytics.component.scss'],
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
export class EmployerAnalyticsComponent implements OnInit, OnChanges {

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

      this.getAllStatistic();
    }),
  );

  resetFilter() {
    this.timePeriod.reset();
  }


  public readonly STATUSES = STATUSES;
  public showLabels: boolean = false;

  public statusForStatEmployerResponds: Status = STATUSES[0];
  public statEmployerResponds = [
    { name: 'Отклики работодателя', value: 0 },
    { name: 'Остальные отклики', value: 0 },
  ];

  public statusForStatEmployerOffers: Status = STATUSES[0];
  public statEmployerOffers = [
    { name: 'Предложения работодателя', value: 0 },
    { name: 'Остальные предложения', value: 0 },
  ];

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

  public statEmployerResumePerDay: any[] = [];

  public statEmployerRespondsPerDayActiveStatuses = {
    all: true,
    awaiting: true,
    questionnaire: true,
    approved: true,
    rejected: true,
  };
  public statEmployerRespondsPerDay = [];

  public statEmployerOffersPerDayActiveStatuses = {
    all: true,
    awaiting: true,
    questionnaire: true,
    approved: true,
    rejected: true,
  };
  public statEmployerOffersPerDay = [];

  constructor(private analyticsApi: AnalyticsApi) {
  }

  public ngOnInit() {}

  public ngOnChanges() {
    this.analyticsApi.dateFilter.next({});
    this.getAllStatistic();
  }

  getAllStatistic() {
    this.getStatEmployerResponds();
    this.getStatEmployerOffers();
    this.getAttitudeResponds();
    this.getAttitudeOffers();
    this.getStatEmployerResumePerDay();
    this.getStatEmployerRespondsPerDay();
    this.getStatEmployerOffersPerDay();
  }

  getStatEmployerResponds() {
    this.analyticsApi.statEmployerResponds(this.user._id, this.statusForStatEmployerResponds.code)
      .subscribe(
        res => {
          this.statEmployerResponds = [
            { name: 'Отклики работодателя', value: res.statistics.employerCount },
            { name: 'Остальные отклики', value: res.statistics.allCount - res.statistics.employerCount },
          ];
        },
      );
  }

  getStatEmployerOffers() {
    this.analyticsApi.statEmployerOffer(this.user._id, this.statusForStatEmployerOffers.code)
      .subscribe(
        res => {
          this.statEmployerOffers = [
            { name: 'Предложения работодателя', value: res.statistics.employerCount },
            { name: 'Остальные предложения', value: res.statistics.allCount - res.statistics.employerCount },
          ];
        },
      );
  }

  getAttitudeResponds() {
    this.analyticsApi.statEmployerAttitudeResponses(this.user._id)
      .subscribe(
        res => {
          this.attitudeRespondsTemplate[0].value = res.statistics.AWAITING;
          this.attitudeRespondsTemplate[1].value = res.statistics.WAIT_QUESTIONNAIRE;
          this.attitudeRespondsTemplate[2].value = res.statistics.QUESTIONNAIRE_DONE;
          this.attitudeRespondsTemplate[3].value = res.statistics.APPROVED;
          this.attitudeRespondsTemplate[4].value = res.statistics.REJECTED;
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
    this.analyticsApi.statEmployerAttitudeOffers(this.user._id)
      .subscribe(
        res => {
          this.attitudeOffersTemplate[0].value = res.statistics.AWAITING;
          this.attitudeOffersTemplate[1].value = res.statistics.WAIT_QUESTIONNAIRE;
          this.attitudeOffersTemplate[2].value = res.statistics.QUESTIONNAIRE_DONE;
          this.attitudeOffersTemplate[3].value = res.statistics.APPROVED;
          this.attitudeOffersTemplate[4].value = res.statistics.REJECTED;
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

  getStatEmployerResumePerDay() {
    this.analyticsApi.statEmployerResumePerDay(this.user._id)
      .subscribe(
        res => {
          this.statEmployerResumePerDay = res.statistics.map(day => {
            return {
              name: moment(day.date).format('DD.MM.YY'),
              series: [
                { name: 'Просмотренно', value: day.resumeViewCount || 0 },
                { name: 'Куплено', value: day.payResumeContactsCount || 0 },
              ],
            };
          });
        },
      );
  }

  getStatEmployerRespondsPerDay() {
    this.analyticsApi.statEmployerRespondsPerDay(this.user._id)
      .subscribe(
        res => {
          this.statEmployerRespondsPerDay = res.statistics.map((day) => {
            const newDay = {
              name: moment(day.date).format('DD.MM.YY'),
              series: [],
            };

            if (this.statEmployerRespondsPerDayActiveStatuses.all) {
              newDay.series.push({ name: 'Всего', value: day.AWAITING + day.QUESTIONNAIRE_DONE + day.APPROVED + day.REJECTED });
            }
            if (this.statEmployerRespondsPerDayActiveStatuses.awaiting) {
              newDay.series.push({ name: 'Ожидание', value: day.AWAITING });
            }
            if (this.statEmployerRespondsPerDayActiveStatuses.questionnaire) {
              newDay.series.push({ name: 'Ожидает опросника', value: day.QUESTIONNAIRE_DONE });
            }
            if (this.statEmployerRespondsPerDayActiveStatuses.approved) {
              newDay.series.push({ name: 'Одобрено', value: day.APPROVED });
            }
            if (this.statEmployerRespondsPerDayActiveStatuses.rejected) {
              newDay.series.push({ name: 'Отклонено', value: day.REJECTED });
            }

            return newDay;
          });
        },
      );
  }

  getStatEmployerOffersPerDay() {
    this.analyticsApi.statEmployerOffersPerDay(this.user._id)
      .subscribe(
        res => {
          this.statEmployerOffersPerDay = res.statistics.map((day) => {
            const newDay = {
              name: moment(day.date).format('DD.MM.YY'),
              series: [],
            };

            if (this.statEmployerOffersPerDayActiveStatuses.all) {
              newDay.series.push({ name: 'Всего', value: day.AWAITING + day.QUESTIONNAIRE_DONE + day.APPROVED + day.REJECTED });
            }
            if (this.statEmployerOffersPerDayActiveStatuses.awaiting) {
              newDay.series.push({ name: 'Ожидание', value: day.AWAITING });
            }
            if (this.statEmployerOffersPerDayActiveStatuses.questionnaire) {
              newDay.series.push({ name: 'Ожидает опросника', value: day.QUESTIONNAIRE_DONE });
            }
            if (this.statEmployerOffersPerDayActiveStatuses.approved) {
              newDay.series.push({ name: 'Одобрено', value: day.APPROVED });
            }
            if (this.statEmployerOffersPerDayActiveStatuses.rejected) {
              newDay.series.push({ name: 'Отклонено', value: day.REJECTED });
            }

            return newDay;
          });
        },
      );
  }
}

interface Status {
  code: number;
  description: string;
}

const STATUSES: Status[] = [
  { code: 0, description: 'Ожидание' },
  { code: 3, description: 'Ожидание опросника' },
  { code: 4, description: 'Опросник заполнен' },
  { code: 5, description: 'Принято' },
  { code: 6, description: 'Отклонено' },
];
