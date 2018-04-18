import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";

import { LocalizationService, ResumeService } from "../../services";
import { FilterResumesService } from "../filter-resumes";
import { SortService } from "../../services/sort.service";
import { SortModel } from "../../models/sort.model";

@Component({
    selector: 'list-resume',
    templateUrl: './list-resume.component.html',
    styleUrls: ['./list-resume.component.less']
})
export class ListResumeComponent implements OnInit {

    @Input() config: string;

    public dictionary: any = null;

    private offset: number = 0;
    public listResume: any[];

    constructor(private _http: HttpClient,
                private _filterResumesService: FilterResumesService,
                public resumeService: ResumeService,
                private _sortService: SortService,
                private _localizationService: LocalizationService) {
    }


    ngOnInit(): void {

        this.dictionary = this._localizationService.currentDictionary;

        this._sortService.typeSort
            .subscribe(
                (parameters) => this.sorting(parameters)
            )

        // резюме пользоватля
        if (this.config === "user") {
            this._http.get(`:8080/api/v1/user/resume/all`)
                .subscribe((res: any) => {
                    this.listResume = this.formatting(res.resumeList);
                });
        } else if (this.config === "all") {

            //фитрованные резюме
            this._filterResumesService.filter$
                .subscribe((parameters: any) => {
                    if (parameters != null) {
                        this._http.post(`:8080/api/v1/resume/get/all`, { offset: this.offset, filters: parameters, count: 24 })
                            .subscribe((res: any) => {
                                this.listResume = this.formatting(res.resumeList);
                            });
                    } else {
                        //все резюме
                        this._http.post(`:8080/api/v1/resume/get/all`, { offset: this.offset, count: 24 })
                            .subscribe((res: any) => {
                                this.listResume = this.formatting(res.resumeList);
                            });
                    }
                });
        };
    };

    public formatting(list: any[]) {

        let answer = list.map((item) => {

            if ((!item.experienceAllTime) || (item.experienceAllTime == '0;0')) {
                item.experienceAllTime = 'Без опыта';
            } else {
                let time = item.experienceAllTime.split(';');
                item.experienceAllTime = `${time[0]} лет и ${time[1]} месяцев`;
            }

            return item;

        });

        return answer;
    }

    public sorting(parameters: SortModel): void {

        switch(parameters.type) {
            case 'experience':
                this.listResume.sort((a, b) => {
                    if (a.experienceAll > b.experienceAll) {
                        return 1*parameters.order;
                    }
                }); break;
            case 'salary':
                this.listResume.sort((a, b) => {
                    if (a.salary > b.salary) {
                        return 1*parameters.order;
                    }
                }); break;
            default: break;
        }

    }


}
