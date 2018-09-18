import { Component, Input, OnInit } from '@angular/core';
import { VacancyModel } from 'models';
import { LocalizationService } from 'services';

@Component({
  selector: 'card-vacancy',
  templateUrl: 'card-vacancy.component.html',
  styleUrls: ['card-vacancy.component.scss'],
})
export class CardVacancyComponent implements OnInit {

  @Input('vacancy') vacancy?: VacancyModel;
  @Input('add-vacancy') add?: boolean;

  public dictionary: any = null;

  constructor(private _localization: LocalizationService) {
  }

  ngOnInit() {
    this.dictionary = this._localization.currentDictionary;
  }

}
