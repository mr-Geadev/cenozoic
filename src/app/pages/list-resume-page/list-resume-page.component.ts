import {Component, OnInit} from '@angular/core';

import {SortModel} from '../../models';
import {LocalizationService, SortService} from '../../services';

@Component({
    selector: 'list-resume-page',
    templateUrl: './list-resume-page.component.html',
    styleUrls: ['./list-resume-page.component.less']
})
export class ListResumePageComponent implements OnInit {
    public dictionary: any = null;
    public selected = 'ascending';

    public sortParameter: SortModel = new SortModel({});

    constructor(private _sortService: SortService,
                private _localizationService: LocalizationService) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;

        this._sortService.typeSort
            .subscribe(
                parameters => {
                    if (parameters) {
                        this.sortParameter = parameters;
                    } else {
                        this.sortParameter = new SortModel({});
                    }
                }
            );
    }

    public updateSortParameters(): void {
        this._sortService.newSortParameters(this.sortParameter);
    }

}