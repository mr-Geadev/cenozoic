import {Component, OnInit} from '@angular/core';
import {LocalizationService} from '../../services/localization.service';

@Component({
    selector: 'list-vacancy-page',
    templateUrl: './list-vacancy-page.component.html',
    styleUrls: ['./list-vacancy-page.component.less']
})
export class ListVacancyPageComponent implements OnInit {

    public dictionary: any = null;

    constructor(private _localizationService: LocalizationService) {
    }

    public ngOnInit() {
        this.dictionary = this._localizationService.currentDictionary;
    }
}