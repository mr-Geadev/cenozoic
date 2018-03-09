import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ResumeService, UserService } from "../../services";
import { VacancyFullService } from "./vacancy-full.service";

@Component({
    selector: 'vacancy-full',
    templateUrl: './vacancy-full.component.html',
    styleUrls: ['./vacancy-full.component.less']
})
export class VacancyFullComponent implements OnInit {

    constructor(public resumeService: ResumeService,
                private _vacancyFullService: VacancyFullService,
                private activateRoute: ActivatedRoute) {
        this.id = activateRoute.snapshot.params['id'];
    }

    private id: string = null;
    public currentVacancy: any = null;



    ngOnInit(): void {
        this._vacancyFullService.getVacancy(this.id)
            .subscribe(
                res => this.currentVacancy = res
            )
    }

}