import {Component, OnInit} from '@angular/core';
import {LocalizationService} from '../../services/localization.service';

@Component({
    selector: 'list-vacancy-page',
    templateUrl: './list-vacancy-page.component.html',
    styleUrls: ['./list-vacancy-page.component.scss']
})
export class ListVacancyPageComponent implements OnInit {

    public dictionary: any = {};

    constructor(private _localizationService: LocalizationService) {
    }

    public ngOnInit() {
      this._localizationService.currentDictionary
        .subscribe(
          res => this.dictionary = res
        );
    }
}