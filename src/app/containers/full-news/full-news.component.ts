import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsModel } from 'models';

import { LocalizationService } from 'services';

@Component({
  selector: 'full-news',
  templateUrl: './full-news.component.html',
  styleUrls: ['./full-news.component.scss'],
})
export class FullNewsComponent implements OnInit {

  public dictionary: any = null;
  public news: NewsModel = new NewsModel();
  private id: string = null;
  private currentLang: string = null;

  constructor(private activateRoute: ActivatedRoute,
              private _localizationService: LocalizationService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.dictionary = this._localizationService.currentDictionary;

    this.currentLang = LocalizationService.currentLang();
  }
}
