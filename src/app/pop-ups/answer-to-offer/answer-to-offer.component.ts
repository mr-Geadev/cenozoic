import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UserModel, VacancyModel } from 'models';
import { LocalizationService, SystemMessageService, UserService } from 'services';
import { ResumeApi, RespondsApi } from 'api';
import { RESPOND_STATUSES } from '../../const';

@Component({
  selector: 'answer-to-offer',
  templateUrl: './answer-to-offer.component.html',
  styleUrls: ['./answer-to-offer.component.scss'],
})

export class AnswerToOfferComponent implements OnInit {

  public dictionary: any = null;
  public answer: boolean = true;
  public vacancy: VacancyModel = null;
  public checkedResume: any = null;
  public resumeList: any[] = [];
  public user: UserModel = null;

  constructor(private _systemMessageService: SystemMessageService,
              private _localizationService: LocalizationService,
              private listResumeApi: ResumeApi,
              private respondsApi: RespondsApi,
              private _userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.dictionary = this._localizationService.currentDictionary;

    this.vacancy = new VacancyModel(this.data.respond ? this.data.respond.vacancy : this.data.vacancy);

    if (!this.data.respond) {
      this.listResumeApi.getUserResume()
        .subscribe((res: any) => {
          this.resumeList = res.resumeList;
          this.checkedResume = this.resumeList[0];
        });
    } else {
      this.checkedResume = this.data.respond.resume;
    }

    this._userService.user$
      .subscribe((user) => {
        this.user = user;
      });
  }

  sendRespond() {
    if (!this.data.respond) {
      this.respondsApi.createRespond(this.vacancy._id, this.checkedResume._id);
    } else {
      this.respondsApi.setStatusOffer(this.data.respond._id, this.answer ? RESPOND_STATUSES.APPROVED : RESPOND_STATUSES.REJECTED);
      this.respondsApi.checkOfferToViewed(this.data.respond._id);
    }
  }

  checkResume(resume) {
    this.checkedResume = resume;
  }

}
