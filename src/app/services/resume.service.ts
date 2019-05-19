import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { LocalizationService } from './localization.service';
import { SystemMessageService } from './system-message.service';
import { UserService } from './user.service';

@Injectable()
export class ResumeService {

  url = environment.apiUrl;

  private _userId: string;
  private resumeSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public resume$: Observable<any> = this.resumeSubject.asObservable();
  public dictionary: any = {};

  constructor(private http: HttpClient,
              private userService: UserService,
              private _systemMessages: SystemMessageService,
              private _localizationService: LocalizationService,
              private router: Router) {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );
  }

  public setResume(resume: any): void {
    this.resumeSubject.next(resume);
  }

  public goEdit(resume: any): void {
    this.router.navigate(['create-resume']);
    this.setResume(resume);
  }

  public delete(id: string): void {
    this.http.get(this.url + `/api/v1/user/resume/remove?resumeId=${id}`)
      .subscribe((res: any) => {
        if (res.success) {
          this._systemMessages.info(this.dictionary.INFO_MESSAGES_SUCCESS_WAS_DELETED);
          this.router.navigate(['list-resume']);
        } else {
          this._systemMessages.info(res.errorMessage);
        }
      });
  }

  public buyResume(resumeId: any): Observable<any> {
    return this.http.get(this.url + `/api/v1/employer/resume/contacts/pay?resumeId=${resumeId}`);
  }
}
