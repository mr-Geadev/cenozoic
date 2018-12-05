import { Component, OnInit } from '@angular/core';

import { LocalizationService } from '../../../services/index';

@Component({
  selector: 'main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss'],
})
export class MainBannerComponent implements OnInit {
  public dictionary: any = {};

  constructor(private _localizationService: LocalizationService) {
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );
  }
}
