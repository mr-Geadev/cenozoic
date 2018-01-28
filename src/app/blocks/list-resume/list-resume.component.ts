import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FilterResumesService } from "../filter-resumes/filter-resumes.service";
import { ResumeService } from "../../services/resume.service";

@Component({
    selector: 'list-resume',
    templateUrl: './list-resume.component.html',
    styleUrls: ['./list-resume.component.less']
})
export class ListResumeComponent implements OnInit {

    @Input() config: string;

    private offset: number = 0;
    public listResume: any[];

    constructor( private _http: HttpClient,
                 private _filterResumesService: FilterResumesService,
                 public resumeService: ResumeService) { }


    ngOnInit (): void {

        if (this.config === "resume") {
            this._http.get(`/api/v1/user/resume/all`)
                .subscribe( (res:any) => {
                    this.listResume = res.resumeList;
                    this.formatting(this.listResume);
                });
        } else if (this.config === "all") {

            this._filterResumesService.filter$.subscribe((parameters: any) => {
                if (parameters != null) {
                    this._http.get(`/api/v1/resume/get/all?offset=${this.offset}filters:${parameters}`)
                        .subscribe( (res:any) => {
                            this.listResume = res.resumeList;
                            this.formatting(this.listResume);
                        });
                } else {
                    this._http.get(`/api/v1/resume/get/all?offset=${this.offset}`)
                        .subscribe((res: any) => {
                            this.listResume = res.resumeList;
                            this.formatting(this.listResume);
                            console.log(this.listResume);
                        });
                }
            });
        };




    };

    public formatting(list: any[]) {

        let answer = list.map((item)=>{
            let time = item.experienceAllTime.split(';');
            item.experienceAllTime = `${time[0]} лет и ${time[1]} месяцев`;
        });

        return answer;
    }


}
