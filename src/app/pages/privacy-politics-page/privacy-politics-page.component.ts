import { Component, OnInit } from '@angular/core';
import { LocalizationApi } from 'api';
import { LocalizationService } from 'services';

@Component({
  selector: 'privacy-politics-page',
  templateUrl: './privacy-politics-page.component.html',
  styleUrls: ['./privacy-politics-page.component.scss']
})
export class PrivacyPoliticsPageComponent implements OnInit {

  currentLang = 'ru';
  html = '';

  constructor(
    public localizationApi: LocalizationApi,
  ) {
  }

  ngOnInit() {
    this.currentLang = LocalizationService.currentLang();

    this.localizationApi.getStaticPage(this.currentLang, 'privacyPolicy')
      .subscribe((res) => {
        this.html = res['page'];
      });
  }

}
