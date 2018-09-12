import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { SystemMessageService, UserService } from '../../services';
import {LocalizationService} from '../../services/localization.service';
import {ChangeCityModalComponent} from '../../pop-ups/change-city/change-city.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ConstructorVacancyService} from './constructor-vacancy.service';
import {City} from '../../pop-ups/change-city/cities.models';
import {ChangeCityService} from '../../pop-ups/change-city';

@Component({
    selector: 'constructor-vacancy',
    templateUrl: './constructor-vacancy.component.html',
    styleUrls: ['./constructor-vacancy.component.scss']
})
export class ConstructorVacancyComponent implements OnInit {

    public vacancy: FormGroup;
    public dictionary: any = null;
    public nameCity: string = null;
    public nationalitiesDefault: any[] = null;
    public currentUser = null;

    constructor(private _createVacancyService: ConstructorVacancyService,
                private _msg: SystemMessageService,
                private _dialog: MatDialog,
                private userService: UserService,
                private _changeCityService: ChangeCityService,
                private _localizationService: LocalizationService) {
    }

    public ngOnInit(): void {

        // подключение локализцаии
        this.dictionary = this._localizationService.currentDictionary;

        this._createVacancyService.getNationalities()
            .subscribe(
                (nationalities: any) => {
                    this.nationalitiesDefault = nationalities.list;
                });

        this.createVacancy();

        this.userService.user$
            .filter(user => !!user)
            .subscribe((user) => {
                this.currentUser = Object.assign({}, user);
            })
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
            email: this.currentUser.email
        }
        this._createVacancyService.createVacancy(vacancy)
            .subscribe(
                (res) => {
                    this._msg.info('Ваша вакансия сохранена');
                },
                (err) => {
                    this._msg.info(err.error.errorMessage);
                }
            );
    }

    private createVacancy(data: any = {salary: {}, experience: {mining: {}, oil: {}}}): void { // дико костыльное решение, кооторое нудно будет потом заменить модлеью
        this.vacancy = new FormGroup({
            title: new FormControl(data.name || '', [Validators.required]),
            currency: new FormControl(data.currency || ''),
            salaryGROSS: new FormGroup({
                from: new FormControl(data.salary.from || 0),
                to: new FormControl(data.salary.to || 0)
            }),
            salaryNET: new FormGroup({
                from: new FormControl(data.salary.from || 0),
                to: new FormControl(data.salary.to || 0)
            }),
            country: new FormControl(data.country || null, [Validators.required]),
            city: new FormControl(data.city || null, [Validators.required]),
            experience: new FormGroup({
                oil: new FormGroup({
                    checked: new FormControl(data.experience.oil.checked || false),
                    years: new FormControl({
                        value: data.experience.oil.years || 0,
                        disabled: !data.experience.oil.checked
                    }),
                    months: new FormControl({
                        value: data.experience.oil.months || 0,
                        disabled: !data.experience.oil.checked
                    }),
                }),
                mining: new FormGroup({
                    checked: new FormControl(data.experience.mining.checked || false),
                    years: new FormControl({
                        value: data.experience.mining.years || 0,
                        disabled: !data.experience.mining.checked
                    }),
                    months: new FormControl({
                        value: data.experience.mining.months || 0,
                        disabled: !data.experience.mining.checked
                    }),
                })
            }),
            nationalities: new FormControl(data.nationalities || []),
            schedule: new FormControl(data.schedule || '', [Validators.required]),
            employmentType: new FormControl(data.employmentType || '', [Validators.required]),
            duties: new FormControl(data.duties || null),
            demands: new FormControl(data.demands || null),
            conditions: new FormControl(data.conditions || null)
        });
    }
}

