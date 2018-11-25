import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerApi, NewsApi } from 'api';
import { BannerModel, NewsModel, UserModel } from 'models';

import { ConfirmService, LocalizationService, UserService } from 'services';
import 'rxjs-compat/add/operator/share';
import 'rxjs-compat/add/operator/last';

@Component({
  selector: 'full-banner',
  templateUrl: './full-banner.component.html',
  styleUrls: ['./full-banner.component.scss'],
})
export class FullBannerComponent implements OnInit {

  public dictionary: any = null;
  public banner: BannerModel;
  private id: string = null;
  private currentLang: string = null;
  public currentUser: UserModel = null;

  constructor(private activateRoute: ActivatedRoute,
              private bannerApi: BannerApi,
              private router: Router,
              public userService: UserService,
              private confirmService: ConfirmService,
              private _dialog: MatDialog,
              private _localizationService: LocalizationService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.dictionary = this._localizationService.currentDictionary;

    this.currentLang = LocalizationService.currentLang();

    this.userService.user$
      .subscribe((user) => {
        if (user) {
          this.currentUser = user;
        }
      });

    this.getBanner();
  }

  getBanner() {
    this.bannerApi.getBannerById(this.id)
      .subscribe(res => { this.banner = new BannerModel(res['banner']); });
  }

  publicate(publicate: boolean) {
    this.bannerApi.publicate(this.id, publicate)
      .subscribe(
        res => this.getBanner(),
      );
  }
}
