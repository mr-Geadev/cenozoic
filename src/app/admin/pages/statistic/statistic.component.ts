import { Component, OnInit } from '@angular/core';
import { AnalyticsApi } from 'api';
import * as moment from 'moment';

@Component({
  selector: 'statistic.col',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {

  statCommonResumeViewBuyPerDay = [];
  statCommonNewRespondsPerDay = [];

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
