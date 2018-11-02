import { Component, Input, OnInit } from '@angular/core';
import { NewsModel } from 'models/news.model';

import { LocalizationService } from 'services';

@Component({
  selector: 'list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.scss'],
})
export class ListNewsComponent implements OnInit {

  @Input() listNews: NewsModel[];

  public dictionary: any = null;

  constructor(private _localizationService: LocalizationService) {
  }

  ngOnInit(): void {
    this.dictionary = this._localizationService.currentDictionary;
  }

}
