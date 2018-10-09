import { Component, OnInit } from '@angular/core';
import { STATUSES } from 'const';
import { FilterRespondService } from './filter-respond.service';
import { LocalizationService } from 'services';

@Component({
  selector: 'filter-respond',
  templateUrl: './filter-respond.component.html',
  styleUrls: ['./filter-respond.component.scss'],
})
export class FilterRespondComponent implements OnInit {

  public STATUSES = STATUSES;

  public dictionary: any = null;
  public parameters = {
    filters: {
      status: null,
    },
    sortBy: 'resumeTitle' // resumeTitle, vacancyTitle, creationDate
  }

  constructor(public filterRespondService: FilterRespondService,
              private _localizationService: LocalizationService) {
  }

  ngOnInit() {
    this.dictionary = this._localizationService.currentDictionary;

    this.filterRespondService.filter$
      .filter(parameters => !!parameters)
      .subscribe((parameters) => this.parameters = parameters);
  }
}
