import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SystemMessageService} from '../../services';
import {LocalizationService} from '../../services/localization.service';
import {ChangeCityModalComponent} from '../../modals/change-city/change-city.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ConstructorVacancyService} from './constructor-vacancy.service';

@Component({
    selector: 'constructor-vacancy',
    templateUrl: './constructor-vacancy.component.html',
    styleUrls: ['./constructor-vacancy.component.less']
})
export class ConstructorVacancyComponent implements OnInit {

    public vacancy: FormGroup;
    public dictionary: any = null;

    constructor(private _createVacancyService: ConstructorVacancyService,
                private _msg: SystemMessageService,
                private _dialog: MatDialog,
                private _localizationService: LocalizationService) {
    }

    public ngOnInit(): void {

        // подклюение локализцаии
        this.dictionary = this._localizationService.currentDictionary;

        this.createVacancy();
        console.log(this.vacancy);
    }

    public changeEducationCity(): void {
        this._dialog.open(ChangeCityModalComponent, {
            width: '600px',
            height: '370px'
        } as MatDialogConfig)
            .afterClosed()
            .first()
            .filter(city => !!city)
            .subscribe((city: string) => {
                this.vacancy.controls['city'].setValue(city);
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
        this._createVacancyService.createVacancy(this.vacancy.value)
            .subscribe(
                (res) => {
                    this._msg.info('Ваша вакансия сохранено');
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
            city: new FormControl(data.city || '', [Validators.required]),
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
            schedule: new FormControl(data.schedule || '', [Validators.required]),
            employmentType: new FormControl(data.employmentType || '', [Validators.required]),
            duties: new FormControl(data.duties || null),
            demands: new FormControl(data.demands || null),
            conditions: new FormControl(data.conditions || null)
        });
    }
}

