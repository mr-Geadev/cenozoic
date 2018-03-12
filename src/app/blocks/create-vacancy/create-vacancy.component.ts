import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SystemMessageService } from "../../services";
import { CreateVacancyService } from "./create-vacancy.service";

@Component({
    selector: 'create-vacancy',
    templateUrl: './create-vacancy.component.html',
    styleUrls: ['./create-vacancy.component.less']
})
export class CreateVacancyComponent implements OnInit {

    public vacancy: FormGroup;

    constructor(private _createVacancyService: CreateVacancyService,
                private _msg: SystemMessageService) {
    }

    public ngOnInit(): void {
        this.createVacancy();
    }

    private createVacancy(data: any = { salary: {}, experience: { mining: {}, oil: {} } }): void { // дико костыльное решение, кооторое нудно будет потом заменить модлеью
        this.vacancy = new FormGroup({
            title: new FormControl(data.name || '', [Validators.required, Validators.minLength(10)]),
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
            duties: new FormControl(data.duties || ''),
            demands: new FormControl(data.demands || ''),
            conditions: new FormControl(data.conditions || '')
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
        console.log(this.vacancy);
        this._createVacancyService.createVacancy(this.vacancy.value)
            .subscribe(
                (res) => { this._msg.info('Ваше резюме сохранено')},
                (err) =>  { this._msg.info(err.error.errorMessage)}
            );
    }
}

