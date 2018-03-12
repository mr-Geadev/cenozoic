import { Component, OnInit } from "@angular/core";
import { SortModel } from "../../models/sort.model";
import { SortService } from "../../services/sort.service";

@Component({
    selector: 'list-resume-page',
    templateUrl: './list-resume-page.component.html',
    styleUrls: ['./list-resume-page.component.less']
})
export class ListResumePageComponent implements OnInit {
    public selected = 'ascending';

    public sortParameter: SortModel = new SortModel({});
    constructor(private _sortService: SortService) {

    }

    public ngOnInit(): void {
        this._sortService.typeSort
            .subscribe(
                parameters => {
                    if (parameters) {
                        this.sortParameter = parameters
                    } else {
                        this.sortParameter  = new SortModel({})
                    }
                }
            )
    }

    public updateSortParameters(): void {
        this._sortService.newSortParameters(this.sortParameter);
    }

}