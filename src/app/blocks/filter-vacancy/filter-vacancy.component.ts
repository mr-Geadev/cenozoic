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

    constructor(public filterResumesService: FilterVacancyService) {
    }

    // view function
    public showFilters(reset?: boolean): void {
        if (reset) {
            this.filterResumesService.resetFilterParameters();
        } else {
            this.showing = !this.showing;
        }
    }
}
