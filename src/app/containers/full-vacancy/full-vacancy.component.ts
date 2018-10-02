import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VacancyApi } from 'api';
import { UserModel } from 'models';

import { LocalizationService, ResumeService, UserService } from 'services';
import { PopupsService } from '../../services/popups.service';
import { FullVacancyService } from './full-vacancy.service';
import { CitiesService } from 'services';

@Component({
  selector: 'full-vacancy',
  templateUrl: './full-vacancy.component.html',
  styleUrls: ['./full-vacancy.component.scss'],
})
export class FullVacancyComponent implements OnInit {

  public dictionary: any = null;
  public currentVacancy: any = null;
  private id: string = null;
  public nationalitiesDefault: any[] = null;
  public user: UserModel = null;

  constructor(public resumeService: ResumeService,
              private _vacancyFullService: FullVacancyService,
              private _localizationService: LocalizationService,
              private vacancyApi: VacancyApi,
              public responds: PopupsService,
              private userService: UserService,
              public citiesService: CitiesService,
              private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.dictionary = this._localizationService.currentDictionary;

    this.userService.user$
      .subscribe((user) => {
        this.user = user;
      })

    this.vacancyApi.getVacancyById(this.id);

    this.vacancyApi.viewedVacancy$
      .subscribe((vacancy) => this.currentVacancy = vacancy)

    this._vacancyFullService.getNationalities()
      .subscribe(
        (nationalities: any) => {
          this.nationalitiesDefault = nationalities.list;
        });
  }

  public findNameNationality(): string {
    let i = 0, answer = [];

    if (this.nationalitiesDefault) {
      this.nationalitiesDefault.filter((item) => {
        if (item.code === this.currentVacancy.nationalities[i]) {
          answer.push(item.name);
          i++;
        }
      });
    }

    return answer.join(', ');
  }

}
