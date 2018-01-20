import { Component, OnInit } from '@angular/core';
import { ResumeService } from "../../services/resume.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'resume-full',
    templateUrl: './resume-full.component.html',
    styleUrls: ['./resume-full.component.less']
})
export class ResumeFullComponent implements OnInit{

    constructor(public resumeService: ResumeService,
                private activateRoute: ActivatedRoute) {

        this.id = activateRoute.snapshot.params['id'];
    }

    private id: string = null;

    public currentResume: any;

    ngOnInit():void {
        this.resumeService.resume$
            .subscribe((resume) => {
                if (resume != null) {
                    this.currentResume = resume;
                } else {
                    console.log('Не готово API');
                }
            })
    }

}
