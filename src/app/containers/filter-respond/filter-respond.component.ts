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
  public status: number = null;

  constructor(public filterRespondService: FilterRespondService,
              private _localizationService: LocalizationService) {
  }

  ngOnInit() {
    this.dictionary = this._localizationService.currentDictionary;

    this.filterRespondService.filter$
      .subscribe((filter) => this.status = filter);
  }
}
