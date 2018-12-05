import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionnaireModel, RespondModel } from 'models';
import { NewsModel } from 'models/news.model';
import { PayingModalService } from 'pop-ups/paying';
import { QuestionnairesApi, RespondsApi } from '../../api';
import { LocalizationService } from '../../services';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'personal-account-page',
  templateUrl: './personal-account-page.component.html',
  styleUrls: ['./personal-account-page.component.scss'],
})
export class PersonalAccountPageComponent implements OnInit {

  readonly TABS = {
    RESPONDS: 'responds',
    OFFERS: 'offers',
    ARCHIVE: 'archive',
    QUESTIONNAIRE: 'questionnaire',
    NEWS: 'news',
    BANNERS: 'banners',
    CONTACTS: 'contacts',
    VACANCY: 'vacancy',
    RESUME: 'resume'
  }

  public activeTab: string = null;
  public dictionary: any = null;
  public typeCurrentUser: string = null;
  public currentUser: any = null;

  public listOfResponds: RespondModel[] = [];
  // [
  //   new RespondModel(0, 'respond', false),
  //   new RespondModel(3, 'respond', true),
  //   new RespondModel(4, 'respond', true),
  //   new RespondModel(5, 'respond', true),
  //   new RespondModel(6, 'respond', true),
  // ]

  public listOfOffers: RespondModel[] = [];
  // [
  //   new RespondModel(0, 'offer', false),
  //   new RespondModel(5, 'offer', true),
  //   new RespondModel(6, 'offer', true),
  // ]

  public listQuestionnaire: QuestionnaireModel[] = [
    // new QuestionnaireModel({title: 'Опросник 1', countOfQuestion: 15, fileQuestionnaire: false}),
    // new QuestionnaireModel({title: 'Опросник 2', countOfQuestion: 147, fileQuestionnaire: false}),
    // new QuestionnaireModel({title: 'Очень длинное название опросника 3', countOfQuestion: 45, fileQuestionnaire: false}),
    // new QuestionnaireModel({title: 'Очень длинное название опросника 4', countOfQuestion: null, fileQuestionnaire: true}),
  ];

  public listOfArchive: RespondModel[] = [];

  constructor(private _localizationService: LocalizationService,
              private respondsApi: RespondsApi,
              private activateRoute: ActivatedRoute,
              private payingModalService: PayingModalService,
              private questionnaireApi: QuestionnairesApi,
              private _userService: UserService) {
  }

  public ngOnInit(): void {

    this.activateRoute.params.subscribe(params => {
      this.activeTab = params['tab'] || 'responds';
      console.log(this.activeTab);
    });

    this.respondsApi.initializeResponds();
    this.questionnaireApi.getQuestionnaires();
    this.respondsApi.getArchive();

    this.dictionary = this._localizationService.currentDictionary;

    this._userService.user$
      .subscribe(
        (user) => {
          if (user) {
            this.typeCurrentUser = user.typeAccount;
            this.currentUser = user;
          }
        }
      );

    this.respondsApi.listOffers$
      .subscribe(
        listOffers => this.listOfOffers = listOffers,
      );

    this.respondsApi.listRespond$
      .subscribe(
        listResponds => this.listOfResponds = listResponds,
      );

    this.respondsApi.listArchive$
      .subscribe(
        listArchive => this.listOfArchive = listArchive,
      );

    this.questionnaireApi.listQuestionnaire$
      .subscribe(
        listQuestionnaire => this.listQuestionnaire = listQuestionnaire,
      );
  }

  public buy(type: string) {
    this.payingModalService.openBuyModal(type);
  }

}
