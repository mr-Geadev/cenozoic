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

  constructor(private analyticsApi: AnalyticsApi) {}

  ngOnInit() {
    this.getStatCommonResumeViewBuyPerDay();
    this.getStatCommonNewRespondsPerDay();
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

}
