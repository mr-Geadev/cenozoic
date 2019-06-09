import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'services';

@Component({
  selector: 'list-news-page',
  templateUrl: './list-news-page.component.html',
  styleUrls: ['./list-news-page.component.scss'],
})
export class ListNewsPageComponent implements OnInit {

  public searchInput: string = '';
  public searchSubmit: string = '';
  public order: string = 'new';
  public dictionary: any = {};

  constructor(private _localizationService: LocalizationService) {
  }

  ngOnInit() {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );
  }

  setFilter() {
    this.searchSubmit = this.searchInput;
  }

}
