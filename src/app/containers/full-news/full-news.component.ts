import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsApi } from 'api';
import { NewsModel, UserModel } from 'models';

import { LocalizationService, UserService } from 'services';

@Component({
  selector: 'full-news',
  templateUrl: './full-news.component.html',
  styleUrls: ['./full-news.component.scss'],
})
export class FullNewsComponent implements OnInit {

  public dictionary: any = null;
  public news: NewsModel;
  private id: string = null;
  private currentLang: string = null;
  public currentUser: UserModel = null;
  public textComment: string = null;

  constructor(private activateRoute: ActivatedRoute,
              private newsApi: NewsApi,
              public userService: UserService,
              private _localizationService: LocalizationService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.dictionary = this._localizationService.currentDictionary;

    this.currentLang = LocalizationService.currentLang();

    this.userService.user$
      .subscribe((user) => {
        if (user) {
          this.currentUser = user;
        }
      });

    this.getNews();
  }

  getNews() {
    this.newsApi.getNewsById(this.id)
      .subscribe(res => { this.news = new NewsModel(res['news']); });
  }

  publish(location) {
    this.newsApi.publishTo(this.id, location)
      .subscribe(
        res => this.getNews()
      );
  }

  sendComment() {
    this.newsApi.addComent(this.id, this.textComment)
      .subscribe(
        res => {
          this.getNews()
          this.textComment = '';
        }
      );
  }
}
