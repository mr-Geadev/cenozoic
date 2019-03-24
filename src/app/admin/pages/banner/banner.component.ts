import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BannerApi } from 'api';
import { BannerModel } from 'models';
import { map, tap } from 'rxjs/operators';
import { LocalizationService } from 'services';

@Component({
  selector: 'banner-list.col',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

  public listBanners: BannerModel[] = [];
  public defaultListBanners: BannerModel[] = [];

  public filter = new FormControl('');

  public filter$ = this.filter.valueChanges.pipe(
    tap((val) => {
      if (val === 'publicated') {
        this.listBanners = this.defaultListBanners.filter(banner => banner.status === 0 && banner.publicate);
        return;
      }
      if (val === 'timeouted') {
        this.listBanners = this.defaultListBanners.filter(banner => banner.status === 3);
        return;
      }
      if (val === 'in_view') {
        this.listBanners = this.defaultListBanners.filter(banner => banner.status === 0 && !banner.publicate );
        return;
      }
      this.listBanners = this.defaultListBanners.slice();
    })
  );

  private currentLang: string = null;

  constructor(public bannerApi: BannerApi) {
  }

  ngOnInit() {
    this.bannerApi.getListAdminBanner()
      .subscribe(
        res => {
          res['banners'].map((banner) => {
            this.defaultListBanners.push(new BannerModel(banner));
            this.listBanners.push(new BannerModel(banner));
          });
        }
      );

    this.currentLang = LocalizationService.currentLang();
    this.filter$.subscribe();
  }

}
