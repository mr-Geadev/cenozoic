import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireModel, RespondModel } from 'models';
import { NewsModel } from 'models/news.model';
import { PayingModalService } from 'pop-ups/paying';
import { combineLatest } from 'rxjs';
import { BannerApi, NewsApi, QuestionnairesApi, RespondsApi } from '../../api';
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
    RESUME: 'resume',
  };

  counters = {
    workerrOffers: 0,
    employerrOffers: 0,
    workerResponds: 0,
    employerResponds: 0,
    banners: 0,
    news: 0,
  }

  public activeTab: string = null;
  public dictionary: any = {};
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
              private router: Router,
              private newsApi: NewsApi,
              private bannerApi: BannerApi,
              private payingModalService: PayingModalService,
              private questionnaireApi: QuestionnairesApi,
              private _userService: UserService) {
  }

  public ngOnInit(): void {

    const combined = combineLatest(
      this.activateRoute.params,
      this._userService.user$,
    ).subscribe(([params, user]) => {
      if (params['tab'] === 'default') {
        this.router.navigate(['personal-account', this.detectFirstTab(user.typeAccount)]);
      }
      const tabDefault = this.detectFirstTab(user.typeAccount);
      this.activeTab = params['tab'] || tabDefault;
    });

    this.respondsApi.initializeResponds();
    this.questionnaireApi.getQuestionnaires();
    this.respondsApi.getArchive();

    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );

    this._userService.user$
      .subscribe(
        (user) => {
          if (user) {
            this.typeCurrentUser = user.typeAccount;
            this.currentUser = user;

            this.newsApi.getListNews(false, false, user._id)
              .subscribe(newsRes => {
                newsRes.newsList.forEach((news) => {
                  if (!news.viewed) { this.counters.news++; }
                });
              })

            if (user.typeAccount === 'employer') {
              this.bannerApi.getUserBanners(user._id)
                .subscribe(banners => {
                  banners.forEach((banner) => {
                    if (!banner.viewed) { this.counters.banners++; }
                  });
                });
            }
          }
        },
      );

    this.respondsApi.listOffers$
      .subscribe(listOffers => {
        this.listOfOffers = listOffers;
        this.counters.workerrOffers = 0;
        this.counters.employerrOffers = 0;
        listOffers.forEach((offers) => {
          if (!offers.workerViewed) { this.counters.workerrOffers++; }
          if (!offers.employerViewed) { this.counters.employerrOffers++; }
        });

        console.log(this.counters);
      });

    this.respondsApi.listRespond$
      .subscribe(listResponds => {
        this.listOfResponds = listResponds;
        this.counters.workerResponds = 0;
        this.counters.employerResponds = 0;
        listResponds.forEach((respond) => {
          if (!respond.workerViewed) { this.counters.workerResponds++; }
          if (!respond.employerViewed) { this.counters.employerResponds++; }
        });
      });

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

  detectFirstTab(typeAccount: string): string {
    if (typeAccount === 'worker') {
      return this.TABS.RESUME;
    } else if (typeAccount === 'employer') {
      return this.TABS.VACANCY;
    } else {
      return this.TABS.RESPONDS;
    }
  }

}
