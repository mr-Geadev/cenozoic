import { Component, Input, OnInit } from '@angular/core';
import { LocalizationService } from 'services';
import { LIST_VACANCY_USER, LIST_VACANCY } from 'const';
import { HttpClient } from '@angular/common/http';
import { FilterVacancyService } from '../filter-vacancy';

@Component({
  selector: 'list-vacancy',
  templateUrl: './list-vacancy.component.html',
  styleUrls: ['./list-vacancy.component.scss'],
})
export class ListVacancyComponent implements OnInit {

  @Input() config: string;
  public listVacancy: any[] = [];
  public dictionary: any = null;
  private _offset: number = 0;

  constructor(private _http: HttpClient,
              private _filterVacancyService: FilterVacancyService,
              private _localizationService: LocalizationService) {
  }

  ngOnInit(): void {
    this.dictionary = this._localizationService.currentDictionary;

    // резюме пользоватля
    if (this.config === 'user') {
      this._http.get(LIST_VACANCY_USER)
        .subscribe((res: any) => {
          this.listVacancy = res.vacancyList;
        });
    } else if (this.config === 'all') {
      this._filterVacancyService.filter$
        .subscribe((parameters: any) => {
          if (parameters != null) {
            // фитрованные резюме
            this._http.post(LIST_VACANCY, { offset: this._offset, filters: parameters, count: 24 })
              .subscribe((res: any) => {
                this.listVacancy = res.vacancyList;
              });
          } else {
            // все резюме
            this._http.post(LIST_VACANCY, { offset: this._offset, count: 24 })
              .subscribe((res: any) => {
                this.listVacancy = res.vacancyList;
              });
          }
        });
    }
  }
}
