import {Component, Input, OnInit} from '@angular/core';
import {LocalizationService} from '../../services';
import {ListVacancyService} from './list-vacancy.service';

@Component({
    selector: 'list-vacancy',
    templateUrl: './list-vacancy.component.html',
    styleUrls: ['./list-vacancy.component.less']
})
export class ListVacancyComponent implements OnInit {

    @Input() config: string;
    public listVacancy: any[] = [];
    public dictionary: any = null;
    private _offset: number = 0;

    constructor(private _listVacancyService: ListVacancyService,
                private _localizationService: LocalizationService) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;

        this._listVacancyService.getListVancacy(this._offset, this.config)
            .subscribe(
                (res) => this.listVacancy = res,
                (err) => console.log(err.error.errorMessage)
            );
    }
}
