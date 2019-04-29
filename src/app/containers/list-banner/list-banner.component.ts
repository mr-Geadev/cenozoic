import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BannerApi } from 'api';
import { IMG_URL } from 'const';
import { BannerModel } from 'models';

import { LocalizationService } from 'services';

@Component({
  selector: 'list-banner',
  templateUrl: './list-banner.component.html',
  styleUrls: ['./list-banner.component.scss'],
})
export class ListBannerComponent implements OnInit {

  IMG_URL = IMG_URL;

  public listBanner: BannerModel[] = [];
  @Input() user?: any = null;

  public dictionary: any = {};
  private currentLang: string = null;

  constructor(private _localizationService: LocalizationService,
              private bannerApi: BannerApi) {
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );

    this.currentLang = LocalizationService.currentLang();

    this.getBanners();
  }

  getBanners() {
    this.bannerApi.getUserBanners(this.user._id)
      .subscribe(
        listBanner => {
          this.listBanner = [];
          listBanner.map((banner) => this.listBanner.push(new BannerModel(banner)));
        },
      );
  }

  checkViewed(bannerId) {
    this.bannerApi.checkViewed(bannerId).subscribe();
  }

}
