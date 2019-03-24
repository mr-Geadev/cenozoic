import { Component, Input, OnInit } from '@angular/core';
import { LocalizationService, UserService } from 'services';
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
  @Input() mainPage?: boolean = false;
  @Input() offset?: number = 0;

  public listVacancy: any[] = [];
  public dictionary: any = {};
  private _offset: number = 0;
  public typeCurrentUser: string = null;

  constructor(private _http: HttpClient,
              private _userService: UserService,
              private _filterVacancyService: FilterVacancyService,
              private _localizationService: LocalizationService) {
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );

    this._userService.user$
      .subscribe(
        (user) => user ? this.typeCurrentUser = user.typeAccount : null
      );

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
                if (this.mainPage) {
                  this.listVacancy = this.listVacancy.filter(vacancy => vacancy.vacancyLanguage === LocalizationService.currentLang());
                }
              });
          }
        });
    }
  }
}
