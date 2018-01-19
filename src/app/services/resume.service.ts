import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ResumeService {

    constructor(private http: HttpClient,
                private userService: UserService,
                private router: Router) {

    }

    private _userId: string;


    private resumeSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public resume$: Observable<any> = this.resumeSubject.asObservable();

    public setResume(resume: any): void {
        this.resumeSubject.next(resume);
    }

    public goEdit(resume: any): void {

        this.userService.user$
            .subscribe((user) => {
                this._userId = user.userId;
            });

        if (this._userId === resume.userId) {
            this.router.navigate(['create-resume']);
            this.setResume(resume);
        }
    }
}
