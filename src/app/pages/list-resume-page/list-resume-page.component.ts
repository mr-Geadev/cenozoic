import { Component, OnInit } from '@angular/core';

import { SortModel } from 'models';
import { LocalizationService } from 'services';

@Component({
  selector: 'list-resume-page',
  templateUrl: './list-resume-page.component.html',
  styleUrls: ['./list-resume-page.component.scss'],
})
export class ListResumePageComponent implements OnInit {
  public dictionary: any = {};
  public selected = 'ascending';

  public sortParameter: SortModel = new SortModel({});

  constructor(private _localizationService: LocalizationService) {
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );
  }

}
