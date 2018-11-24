import { Component, OnInit } from '@angular/core';
import { BannerApi } from 'api';
import { BannerModel } from 'models';
import { LocalizationService } from 'services';

@Component({
  selector: 'banner-list.col',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

  public listBanners: BannerModel[] = [];

  private currentLang: string = null;

  constructor(public bannerApi: BannerApi) {
  }

  ngOnInit() {
    this.bannerApi.getListAdminBanner()
      .subscribe(
        res => { res['banners'].map((banner) => this.listBanners.push(new BannerModel(banner))); },
      );

    this.currentLang = LocalizationService.currentLang();
  }

}
