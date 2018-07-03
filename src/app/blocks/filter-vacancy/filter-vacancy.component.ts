import {Component} from '@angular/core';
import {FilterVacancyService} from './filter-vacancy.service';

@Component({
    selector: 'filter-vacancy',
    templateUrl: './filter-vacancy.component.html',
    styleUrls: ['./filter-vacancy.component.less'],
})
export class FilterVacancyComponent {

    public showing: boolean = false; // view
    public dictionary: any = null;

    constructor(public filterVacancyService: FilterVacancyService) {
    }

    public resetFilters(): void {
        this.filterVacancyService.resetFilterParameters();
    }
}
