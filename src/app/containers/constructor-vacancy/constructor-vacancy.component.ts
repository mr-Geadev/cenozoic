import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { VacancyApi } from 'api';
import { ChangeCityService } from '../../pop-ups/change-city';
import { City } from '../../pop-ups/change-city/cities.models';
import { CitiesService, SystemMessageService, UserService } from '../../services';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'constructor-vacancy',
  templateUrl: './constructor-vacancy.component.html',
  styleUrls: ['./constructor-vacancy.component.scss'],
})
export class ConstructorVacancyComponent implements OnInit {

  public vacancy: FormGroup;
  public vacancyId: string = null;
  public dictionary: any = null;
  public nameCity: string = null;
  public nationalitiesDefault: any[] = null;
  public currentUser = null;

  @Input('edit') edit?: boolean;

  constructor(private _msg: SystemMessageService,
              private _dialog: MatDialog,
              private router: Router,
              private userService: UserService,
              private _changeCityService: ChangeCityService,
              public citiesService: CitiesService,
              private _vacancyApi: VacancyApi,
              private _location: Location,
              private _localizationService: LocalizationService) {
  }

  public ngOnInit(): void {

    // подключение локализцаии
    this.dictionary = this._localizationService.currentDictionary;

    this._vacancyApi.getNationalities()
      .subscribe(
        (nationalities: any) => {
          this.nationalitiesDefault = nationalities.list;
        });

    if (this.edit) {
      this._vacancyApi.viewedVacancy$
        .subscribe(editableVacancy => {
          this.createVacancy(editableVacancy);
          this.vacancyId = editableVacancy._id;
          const city = this.citiesService.locations.getCityToCode(editableVacancy.city);
          this.vacancy.controls['city'].setValue(city.code);
          this.vacancy.controls['country'].setValue(city.codeCountry);
          this.nameCity = city.name;
        });
    } else {
      this.createVacancy();
    }

    this.userService.user$
      .filter(user => !!user)
      .subscribe((user) => {
        this.currentUser = Object.assign({}, user);
      });
  }

  public changeEducationCity(): void {
    this._changeCityService.changeCity()
      .subscribe((city: City) => {
        this.vacancy.controls['city'].setValue(city.code);
        this.vacancy.controls['country'].setValue(city.codeCountry);
        this.nameCity = city.name;
      });
  }

  public experienceDiabedChange(nameField: string): void {
    if (this.vacancy.controls['experience']['controls'][nameField]['controls'].checked.value) {
      this.vacancy.controls['experience']['controls'][nameField]['controls'].years.enable();
      this.vacancy.controls['experience']['controls'][nameField]['controls'].months.enable();
    } else {
      this.vacancy.controls['experience']['controls'][nameField]['controls'].years.disable();
      this.vacancy.controls['experience']['controls'][nameField]['controls'].months.disable();
    }
  }

  public sentVacancy(): void {
    const vacancy = {
      ...this.vacancy.value,
      companyName: this.currentUser.companyName,
      phone: this.currentUser.phone,
      email: this.currentUser.email,
    };
    if (this.edit) {
      this._vacancyApi.editVacancy(vacancy, this.vacancyId)
        .subscribe(
          (res) => {
            this._msg.info('Измнения сохранены');
            this._location.back();
          },
          (err) => {
            this._msg.info(err.error.errorMessage);
          },
        );
    } else {
      this._vacancyApi.createVacancy(vacancy)
        .subscribe(
          (res) => {
            this._msg.info('Ваша вакансия сохранена');
            this.router.navigate(['personal-account', 'vacancy'] );
          },
          (err) => {
            this._msg.info(err.error.errorMessage);
          },
        );
    }
  }

  private createVacancy(data: any = { salaryGROSS: {}, salaryNET: {}, experience: { mining: {}, oil: {} } }): void { // дико костыльное решение, кооторое нудно будет потом заменить модлеью
    this.vacancy = new FormGroup({
      title: new FormControl(data.title || '', [Validators.required]),
      currency: new FormControl(data.currency || ''),
      salaryGROSS: new FormGroup({
        from: new FormControl(data.salaryGROSS.from || 0),
        to: new FormControl(data.salaryGROSS.to || 0),
      }),
      salaryNET: new FormGroup({
        from: new FormControl(data.salaryNET.from || 0),
        to: new FormControl(data.salaryNET.to || 0),
      }),
      country: new FormControl(data.country || null, [Validators.required]),
      city: new FormControl(data.city || null, [Validators.required]),
      experience: new FormGroup({
        oil: new FormGroup({
          checked: new FormControl(data.experience.oil.checked || false),
          years: new FormControl({
              value: data.experience.oil.years || 0,
              disabled: !data.experience.oil.checked,
            },
            [Validators.min(0)]),
          months: new FormControl({
            value: data.experience.oil.months || 0,
            disabled: !data.experience.oil.checked,
          },
            [Validators.min(0), Validators.max(11)]),
        }),
        mining: new FormGroup({
          checked: new FormControl(data.experience.mining.checked || false),
          years: new FormControl({
            value: data.experience.mining.years || 0,
            disabled: !data.experience.mining.checked,
          },
            [Validators.min(0)]),
          months: new FormControl({
            value: data.experience.mining.months || 0,
            disabled: !data.experience.mining.checked,
          },
            [Validators.min(0), Validators.max(11)]),
        }),
      }),
      nationalities: new FormControl(data.nationalities || [], [Validators.required]),
      schedule: new FormControl(data.schedule || '', [Validators.required]),
      employmentType: new FormControl(data.employmentType || '', [Validators.required]),
      duties: new FormControl(data.duties || null),
      demands: new FormControl(data.demands || null),
      conditions: new FormControl(data.conditions || null),
    });
  }
}

