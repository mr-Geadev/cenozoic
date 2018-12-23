import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'services';

@Component({
  selector: 'privacy-politics-page',
  templateUrl: './privacy-politics-page.component.html',
  styleUrls: ['./privacy-politics-page.component.scss']
})
export class PrivacyPoliticsPageComponent implements OnInit {

  currentLang = 'ru';

  constructor() {
  }

  ngOnInit() {
    this.currentLang = LocalizationService.currentLang();
  }

}
