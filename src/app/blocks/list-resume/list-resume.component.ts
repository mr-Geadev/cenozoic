import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";

import { ResumeService } from "../../services";
import { FilterResumesService } from "../filter-resumes";

@Component({
    selector: 'list-resume',
    templateUrl: './list-resume.component.html',
    styleUrls: ['./list-resume.component.less']
})
export class ListResumeComponent implements OnInit {

    @Input() config: string;

    private offset: number = 0;
    public listResume: any[];

    constructor(private _http: HttpClient,
                private _filterResumesService: FilterResumesService,
                public resumeService: ResumeService) {
    }


    ngOnInit(): void {

        // резюме пользоватля
        if (this.config === "resume") {
            this._http.get(`/api/v1/user/resume/all`)
                .subscribe((res: any) => {
                    this.listResume = this.formatting(res.resumeList);
                });
        } else if (this.config === "all") {

            //фитрованные резюме
            this._filterResumesService.filter$
                .subscribe((parameters: any) => {
                    if (parameters != null) {
                        this._http.post(`/api/v1/resume/get/all`, { offset: this.offset, filters: parameters })
                            .subscribe((res: any) => {
                                this.listResume = this.formatting(res.resumeList);
                            });
                    } else {
                        //все резюме
                        this._http.post(`/api/v1/resume/get/all`, { offset: this.offset })
                            .subscribe((res: any) => {
                                this.listResume = this.formatting(res.resumeList);
                            });
                    }
                });
        }
        ;

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


}
