import { Component } from "@angular/core";
import { FilterResumesService } from "./filter-resumes.service";


@Component({
    selector: 'filter-resumes',
    templateUrl: './filter-resumes.component.html',
    styleUrls: ['./filter-resumes.component.less'],
})
export class FilterResumesComponent {

    public showing: boolean = false; // view
    public dictionary: any = null;

    constructor(public filterResumesService: FilterResumesService) {
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
