import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'list-resume',
    templateUrl: './list-resume.component.html',
    styleUrls: ['./list-resume.component.less']
})
export class ListResumeComponent implements OnInit {

    @Input() config: string;

    private offset: number = 0;
    public listResume: any [];

    constructor( private _http: HttpClient ) { }



    ngOnInit (): void {

            if (this.config !== "resume") {
                this._http.get(`/api/v1/resume/get/all?offset=${this.offset}`)
                    .subscribe( (res:any) => {
                        this.listResume = res.resumeList;
                    });
            } else {
                this.offset = 5;
                this._http.get(`/api/v1/resume/get/all?offset=${this.offset}`)
                    .subscribe( (res:any) => {
                        this.listResume = res.resumeList;
                    });
            }
    }

    }
