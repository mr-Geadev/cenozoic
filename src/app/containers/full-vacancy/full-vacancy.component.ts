import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { VacancyApi } from 'api';
import { IMG_URL } from 'const';
import { UserModel } from 'models';
import { PayingModalService } from 'pop-ups/paying';

import { ConfirmService, LocalizationService, ResumeService, SystemMessageService, UserService } from 'services';
import { PopupsService } from '../../services/popups.service';
import { FullVacancyService } from './full-vacancy.service';
import { CitiesService } from 'services';

@Component({
  selector: 'full-vacancy',
  templateUrl: './full-vacancy.component.html',
  styleUrls: ['./full-vacancy.component.scss'],
})
export class FullVacancyComponent implements OnInit {

  imgUrl = IMG_URL;

  public dictionary: any = {};
  public currentVacancy: any = null;
  private id: string = null;
  public nationalitiesDefault: any[] = null;
  public user: UserModel = null;

  constructor(public resumeService: ResumeService,
              public payingModalService: PayingModalService,
              private _vacancyFullService: FullVacancyService,
              private _localizationService: LocalizationService,
              public vacancyApi: VacancyApi,
              public responds: PopupsService,
              private confirmService: ConfirmService,
              private _dialog: MatDialog,
              private userService: UserService,
              public citiesService: CitiesService,
              public messages: SystemMessageService,
              private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );

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

  public activateVacancy() {
    if (this.user.paidOptions.countPossibleCreateVacancy) {
      const confirm = this.confirmService.confirm('Вы хотите продлить размещение вакансии?')
        .subscribe((res) => {
          if (res) {
            this.vacancyApi.activateVacancy(this.id)
              .subscribe(() => {
                this.vacancyApi.getVacancyById(this.id);
                confirm.unsubscribe();
              });
          }
          this._dialog.closeAll();
        });
    } else {
      this.payingModalService.openBuyModal('vacancy');
    }
  }

}
