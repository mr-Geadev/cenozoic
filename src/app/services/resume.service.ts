import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { SystemMessageService } from "./system-message.service";

@Injectable()
export class ResumeService {

    constructor(private http: HttpClient,
                private userService: UserService,
                private _systemMessages: SystemMessageService,
                private router: Router) {

    }

    private _userId: string;


    private resumeSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public resume$: Observable<any> = this.resumeSubject.asObservable();

    public setResume(resume: any): void {
        this.resumeSubject.next(resume);
    }

    // public goResume(resume: any): void {
    //     this.router.navigate(['resume',resume._id]);
    //     this.setResume(resume);
    // }

    public goEdit(resume: any): void {
        this.router.navigate(['create-resume']);
        this.setResume(resume);
    }

    public delete(id: string):void {
        this.http.get(`/api/v1/user/resume/remove?resumeId=${id}`)
            .subscribe((res: any) => {
                if (res.success) {
                    this._systemMessages.info('Ваше резюме было удалено');
                    this.router.navigate(['list-resume']);
                } else {
                    this._systemMessages.info(res.errorMessage);
                }
            });
    }
}
