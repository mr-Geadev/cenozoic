import { Component, OnInit } from '@angular/core';
import { NewsApi } from 'api';
import { NewsModel } from 'models';
import { LocalizationService } from 'services';

@Component({
  selector: 'news-list.col',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  public listNews: NewsModel[] = [];

  private currentLang: string = null;

  constructor(public newsApi: NewsApi) {
  }

  ngOnInit() {
    this.newsApi.getListNews()
      .subscribe(
        res => { res['newsList'].map((news) => this.listNews.push(new NewsModel(news))); },
      );

    this.currentLang = LocalizationService.currentLang();
  }

}
