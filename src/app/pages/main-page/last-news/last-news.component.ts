import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'services';

@Component({
  selector: 'last-news',
  templateUrl: './last-news.component.html',
  styleUrls: ['./last-news.component.scss'],
})
export class LastNewsComponent implements OnInit {
  offset: number = 0;
  public dictionary: any = {};

  constructor(private _localizationService: LocalizationService) {
  }

  ngOnInit() {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );
  }

  addOffset() {
    if (this.offset < 6) {
      this.offset++;
    }
  }

  removeOffset() {
    if (this.offset > 0) {
      this.offset--;
    }
  }

  setOffset(offset) {
    this.offset = offset;
  }
}
