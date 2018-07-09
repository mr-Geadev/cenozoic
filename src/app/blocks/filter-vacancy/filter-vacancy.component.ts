import {Component} from '@angular/core';
import {FilterVacancyService} from './filter-vacancy.service';
import {CitiesService} from '../../services/cities.service';

@Component({
    selector: 'filter-vacancy',
    templateUrl: './filter-vacancy.component.html',
    styleUrls: ['./filter-vacancy.component.less'],
})
export class FilterVacancyComponent {

    public showing: boolean = false; // view
    public dictionary: any = null;

    constructor(public filterVacancyService: FilterVacancyService,
                public citiesService: CitiesService) {
    }

    public resetFilters(): void {
        this.filterVacancyService.resetFilterParameters();
    }
}
