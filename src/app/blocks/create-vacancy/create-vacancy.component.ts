import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreateVacancyService } from "./create-vacancy.service";
import { SystemMessageService } from "../../services/system-message.service";

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

    private createVacancy(data: any = {salary: {}}): void { // дико костыльное решение, кооторое нудно будет потом заменить модлеью
        this.vacancy = new FormGroup({
            title: new FormControl(data.name || '', [ Validators.required, Validators.minLength(10) ]),
            salary: new FormGroup({
                from: new FormControl( data.salary.from || 0 ),
                to: new FormControl( data.salary.to || 0 )
            }),
            city: new FormControl(data.city || '', [ Validators.required ]),
            experience: new FormControl(data.experience || 0, [ Validators.required ]),
            schedule: new FormControl(data.schedule || '', [ Validators.required ]),
            employmentType: new FormControl(data.employmentType || '', [ Validators.required ]),
            duties: new FormControl(data.duties || ''),
            demands: new FormControl(data.demands || ''),
            conditions: new FormControl(data.conditions || '')
        });
    }

    public sentVacancy(): void {
        console.log(this.vacancy.value);
        this._createVacancyService.createVacancy(this.vacancy.value)
            .subscribe(
                (res) => { this._msg.info('Ваше резюме сохранено')},
                (err) =>  {
                    if(err.error.errorCode.name ===  "ValidationError") {
                        this._msg.info('Поля заполнены неправильно');
                    }  else {
                        this._msg.info(err.error.errorMessage);
                    }
                }
            );
    }
}

