import { Component, OnInit } from '@angular/core';
import { LocalizationApi } from 'api';
import { LocalizationService } from 'services';

@Component({
  selector: 'about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.scss']
})
export class AboutUsPageComponent implements OnInit {

  currentLang = 'ru';
  html = '';

  constructor(
    public localizationApi: LocalizationApi,
  ) {
  }

  ngOnInit() {
    this.currentLang = LocalizationService.currentLang();

    this.localizationApi.getStaticPage(this.currentLang, 'aboutUs')
      .subscribe((res) => {
        this.html = res['page'];
      });
  }

}
