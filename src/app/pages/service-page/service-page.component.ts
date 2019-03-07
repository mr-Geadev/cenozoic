import { Component, OnInit } from '@angular/core';
import { LocalizationApi } from 'api';
import { LocalizationService } from 'services';

@Component({
  selector: 'service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss'],
})
export class ServicePageComponent implements OnInit {

  currentLang = 'ru';
  html = '';

  constructor(
    public localizationApi: LocalizationApi,
  ) {
  }

  ngOnInit() {
    this.currentLang = LocalizationService.currentLang();

    this.localizationApi.getStaticPage(this.currentLang, 'serviceUs')
      .subscribe((res) => {
        this.html = res['page'];
      });
  }

}
