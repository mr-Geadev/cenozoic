import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

import { LocalizationService, ResumeService } from 'services';
import { FilterResumesService } from '../filter-resumes';

@Component({
    selector: 'list-resume',
    templateUrl: './list-resume.component.html',
    styleUrls: ['./list-resume.component.scss']
})
export class ListResumeComponent implements OnInit {

    @Input() config: string;

    public dictionary: any = null;
    public listResume: any[];
    private offset: number = 0;

    constructor(private _http: HttpClient,
                private _filterResumesService: FilterResumesService,
                public resumeService: ResumeService,
                private _localizationService: LocalizationService) {
    }


    ngOnInit(): void {

        this.dictionary = this._localizationService.currentDictionary;

        // резюме пользоватля
        if (this.config === 'user') {
            this._http.get(`/api/v1/user/resume/all`)
                .subscribe((res: any) => {
                    this.listResume = res.resumeList;
                });
        } else if (this.config === 'all') {

            // фитрованные резюме
            this._filterResumesService.filter$
                .subscribe((parameters: any) => {
                    if (parameters != null) {
                        this._http.post(`/api/v1/resume/get/all`, {offset: this.offset, filters: parameters, count: 24})
                            .subscribe((res: any) => {
                                this.listResume = res.resumeList;
                            });
                    } else {
                        // все резюме
                        this._http.post(`/api/v1/resume/get/all`, {offset: this.offset, count: 24})
                            .subscribe((res: any) => {
                                this.listResume = res.resumeList;
                            });
                    }
                });
        }
    };

}