import {Component, OnInit} from '@angular/core';
import {FilterVacancyService} from './filter-vacancy.service';
import {CitiesService} from '../../services/cities.service';
import {LocalizationService} from '../../services';

@Component({
    selector: 'filter-vacancy',
    templateUrl: './filter-vacancy.component.html',
    styleUrls: ['./filter-vacancy.component.less'],
})
export class FilterVacancyComponent implements OnInit {

    public showing: boolean = false; // view
    public dictionary: any = null;

    constructor(public filterVacancyService: FilterVacancyService,
                private _localizationService: LocalizationService,
                public citiesService: CitiesService) {
    }

    public resetFilters(): void {
        this.filterVacancyService.resetFilterParameters();
    }

    ngOnInit() {
        this.dictionary = this._localizationService.currentDictionary;
    }
}
