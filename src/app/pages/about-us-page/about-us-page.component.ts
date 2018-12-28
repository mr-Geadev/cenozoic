import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'services';

@Component({
  selector: 'about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.scss']
})
export class AboutUsPageComponent implements OnInit {

  currentLang = 'ru';

  constructor() {
  }

  ngOnInit() {
    this.currentLang = LocalizationService.currentLang();
  }

}
