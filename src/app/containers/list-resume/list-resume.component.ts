import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

import { LocalizationService, ResumeService, UserService } from 'services';
import { environment } from '../../../environments/environment';
import { FilterResumesService } from '../filter-resumes';

@Component({
  selector: 'list-resume',
  templateUrl: './list-resume.component.html',
  styleUrls: ['./list-resume.component.scss'],
})
export class ListResumeComponent implements OnInit {

  url = environment.apiUrl;

  @Input() config?: string;
  @Input() payedResume?: boolean;
  @Input() mainPage?: boolean = false;
  @Input('offset') offsetView?: number = 0;

  public dictionary: any = {};
  public listResume: any[];
  private offset: number = 0;
  public typeCurrentUser: string = null;

  constructor(private _http: HttpClient,
              private _userService: UserService,
              private _filterResumesService: FilterResumesService,
              public resumeService: ResumeService,
              private _localizationService: LocalizationService) {
  }

  ngOnInit(): void {

    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );

    this._userService.user$
      .subscribe(
        (user) => user ? this.typeCurrentUser = user.typeAccount : null,
      );

    if (!this.payedResume) {
      // резюме пользоватля
      if (this.config === 'user') {
        this._http.get(this.url + `/api/v1/user/resume/all`)
          .subscribe((res: any) => {
            this.listResume = res.resumeList;
          });
      } else if (this.config === 'all') {

        // фитрованные резюме
        this._filterResumesService.filter$
          .subscribe((res: any) => {
            let parameters = res;
            if (this.mainPage) {
              parameters = Object.assign(parameters || {}, {resumeLanguage: LocalizationService.currentLang()})
            }
            if (parameters != null) {
              this._http.post(this.url + `/api/v1/resume/get/all`, { offset: this.offset, filters: parameters, count: 24 })
                .subscribe((res: any) => {
                  this.listResume = res.resumeList;
                });
            } else {
              // все резюме
              this._http.post(this.url + `/api/v1/resume/get/all`, { offset: this.offset, count: 24 })
                .subscribe((res: any) => {
                  this.listResume = res.resumeList;
                });
            }
          });
      }
    } else {
      this._http.get(this.url + `/api/v1/employer/paid-resume/all`)
        .subscribe((res: any) => {
          this.listResume = res.resumeList;
        });
    }
  }

}
