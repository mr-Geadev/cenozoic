import { Component, Input, OnInit } from '@angular/core';
import { LocalizationService } from 'services';
import { LIST_VACANCY_USER, LIST_VACANCY } from 'const';
import { HttpClient } from '@angular/common/http';
import { FilterVacancyService } from '../filter-vacancy';

@Component({
  selector: 'list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss'],
})
export class ListOffersComponent implements OnInit {

  public dictionary: any = null;

  constructor(private _localizationService: LocalizationService) {
  }

  ngOnInit(): void {
    this.dictionary = this._localizationService.currentDictionary;
  }
}
