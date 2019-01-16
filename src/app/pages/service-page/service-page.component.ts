import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'services';

@Component({
  selector: 'service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit {

  currentLang = 'ru';

  constructor() {
  }

  ngOnInit() {
    this.currentLang = LocalizationService.currentLang();
  }

}
