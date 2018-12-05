import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LocalizationService } from './localization.service';
import { SystemMessageService } from './system-message.service';
import { UserService } from './user.service';

@Injectable()
export class ResumeService {

  private _userId: string;
  private resumeSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public resume$: Observable<any> = this.resumeSubject.asObservable();

  constructor(private http: HttpClient,
              private userService: UserService,
              private _systemMessages: SystemMessageService,
              private _localizationService: LocalizationService,
              private router: Router) {
  }

  public setResume(resume: any): void {
    this.resumeSubject.next(resume);
  }

  public goEdit(resume: any): void {
    this.router.navigate(['create-resume']);
    this.setResume(resume);
  }

  public delete(id: string): void {
    this.http.get(`/api/v1/user/resume/remove?resumeId=${id}`)
      .subscribe((res: any) => {
        if (res.success) {
          this._systemMessages.info(this._localizationService.currentDictionary.RESUME_WAS_DELETED);
          this.router.navigate(['list-resume']);
        } else {
          this._systemMessages.info(res.errorMessage);
        }
      });
  }

  public buyResume(resumeId: any): Observable<any> {
    return this.http.get(`/api/v1/employer/resume/contacts/pay?resumeId=${resumeId}`);
  }
}
