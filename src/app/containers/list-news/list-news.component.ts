import { Component, Input, OnInit } from '@angular/core';
import { NewsApi } from 'api';
import { NewsModel } from 'models/news.model';

import { LocalizationService } from 'services';

@Component({
  selector: 'list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.scss'],
})
export class ListNewsComponent implements OnInit {

  @Input() newsPage?: boolean = false;
  @Input() mainPage?: boolean = false;
  @Input() user?: string = null;

  public listNews: NewsModel[] = [];

  public dictionary: any = null;
  private currentLang: string = null;

  constructor(private _localizationService: LocalizationService,
              private newsApi: NewsApi) {
  }

  ngOnInit(): void {
    this.dictionary = this._localizationService.currentDictionary;

    this.currentLang = LocalizationService.currentLang();

    // (all, mainPage, user)
    this.newsApi.getListNews(this.newsPage, this.mainPage, this.user)
      .subscribe(
        res => { res['newsList'].map((news) => this.listNews.push(new NewsModel(news))); },
      );
  }

}
