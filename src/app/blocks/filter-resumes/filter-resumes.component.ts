import {Component, OnInit} from '@angular/core';
import {FilterResumesService} from './filter-resumes.service';
import {LocalizationService} from '../../services';


@Component({
    selector: 'filter-resumes',
    templateUrl: './filter-resumes.component.html',
    styleUrls: ['./filter-resumes.component.less'],
})
export class FilterResumesComponent implements OnInit {

    public showing: boolean = false; // view
    public dictionary: any = null;

    constructor(public filterResumesService: FilterResumesService,
                private _localizationService: LocalizationService) {
    }

    // view function
    public showFilters(reset?: boolean): void {
        if (reset) {
            this.filterResumesService.resetFilterParameters();
        } else {
            this.showing = !this.showing;
        }
    }

    ngOnInit() {
        this.dictionary = this._localizationService.currentDictionary;
    }
}
