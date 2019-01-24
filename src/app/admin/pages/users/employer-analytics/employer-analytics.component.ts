import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AnalyticsApi } from 'api';
import { ConfirmService } from '../../../../services/confirm.service';
import { UserModel } from '../../../../models/user.model';
import { SystemMessageService, UserService } from '../../../../services';
import { UsersApi } from '../users.api';

@Component({
  selector: 'employer-analytics',
  templateUrl: 'employer-analytics.component.html',
  styleUrls: ['./employer-analytics.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployerAnalyticsComponent implements OnInit, OnChanges {

  @Input() user: UserModel;

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

  constructor(private analyticsApi: AnalyticsApi) {
  }

  public ngOnInit() {}

  public ngOnChanges() {
    this.getStatEmployerResponds();
    this.getStatEmployerOffers();
    this.getAttitudeResponds();
    this.getAttitudeOffers();
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