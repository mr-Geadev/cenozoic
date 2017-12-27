import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'list-resume',
    templateUrl: './list-resume.component.html',
    styleUrls: ['./list-resume.component.less']
})
export class ListResumeComponent implements OnInit {


    constructor( private _http: HttpClient ) { }

    private offset: number = 0;
    public listResume: any [];

    ngOnInit (): void {
            this._http.get(`/api/v1/resume/get/all?offset=${this.offset}`)
                .subscribe( (res:any) => {
                    this.listResume = res.resumeList;
                })
    }

    }
