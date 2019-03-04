import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BannerApi, NewsApi } from 'api';
import { BannerModel } from 'models';
import { NewsModel } from 'models/news.model';
import { zip } from 'rxjs/internal/observable/zip';

import { LocalizationService } from 'services';

@Component({
  selector: 'list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.scss'],
})
export class ListNewsComponent implements OnInit, OnChanges {

  @Input() newsPage?: boolean = false;
  @Input() mainPage?: boolean = false;
  @Input() user?: string = null;

  @Input() searchString?: string = null;
  @Input() offset?: number = 0;
  @Input() reverse?: boolean = null;

  public listNews: NewsModel[] = [];
  public listBanner: BannerModel[] = [];
  public list: any[] = [];

  public dictionary: any = {};
  private currentLang: string = null;

  constructor(private _localizationService: LocalizationService,
              private bannerApi: BannerApi,
              private newsApi: NewsApi) {
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );

    this.currentLang = LocalizationService.currentLang();

    this.getList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.searchString) || (changes.reverse)) {
      this.getList();
    }
  }

  getList() {
    zip(
      this.newsApi.getListNews(this.newsPage, this.mainPage, this.user, this.searchString),
      this.bannerApi.getListBanner(this.mainPage),
    ).subscribe(
      ([newsRes, bannersRes]) => {
        this.list = [];
        this.listNews = [];
        this.listBanner = [];

        newsRes['newsList'].map((news) => this.listNews.push(new NewsModel(news)));
        bannersRes['banners'].map((banner) => this.listBanner.push(new BannerModel(banner)));

        if (this.reverse) {
          this.listNews.reverse();
        }

        let indexBanner = 0;
        let counterNews = 0;
        this.listNews.forEach((news) => {
          if (counterNews === 2 && this.listBanner[indexBanner] ) {
            this.list.push(this.listBanner[indexBanner]);
            this.list.push(news);
            indexBanner += 1;
            counterNews = 1;
          } else {
            this.list.push(news);
            counterNews += 1;
            console.log(news);
          }
        });

        if ((counterNews === 2) && (this.listBanner[indexBanner])) {
          this.list.push(this.listBanner[indexBanner]);
          indexBanner += 1;
          counterNews = 0;
        }
        console.log(this.list);
      },
    );
  }

}
