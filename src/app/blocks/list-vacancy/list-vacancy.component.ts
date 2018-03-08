import { Component, OnInit } from '@angular/core';
import { ListVacancyService } from "./list-vacancy.service";

@Component({
    selector: 'list-vacancy',
    templateUrl: './list-vacancy.component.html',
    styleUrls: ['./list-vacancy.component.less']
})
export class ListVacancyComponent implements OnInit {

    private _offset: number = 0;
    public listVacancy: any[] = [];

    constructor(private _listVacancyService: ListVacancyService) {
    }

    public ngOnInit() {
        this._listVacancyService.getListVancacy(this._offset)
            .subscribe(
                (res) => this.listVacancy = res,
                (err) => console.log(err.error.errorMessage)
            );
    }

}
