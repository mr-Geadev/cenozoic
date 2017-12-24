import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CREATE_RESUME } from "../../constants";



@Component({
    selector: 'create-resume',
    templateUrl: './create-resume.component.html',
    styleUrls: ['./create-resume.component.less']
})
export class CreateResumeComponent {
    public confirmed: boolean = false;
    public educationExample: any = {
        start: null,
        stage: null,
        end: null,
        countries: null,
        city: null,
        university: null,
        faculty: null,
        specialty: null
    };
    public educations = [ Object.assign({}, this.educationExample) ];
    public resumeForm: any = {

    };



    constructor(private http: HttpClient) {
        // console.log(this.educationExample);
    }

    send() {
        console.log(this.resumeForm);
        this.http.get(CREATE_RESUME, this.resumeForm)
            .subscribe((res: any) => {
                this.confirmed = res.code === 200;
            });
    }

    addEducation () {
        // var a = {};
        // for (let key in this.educationExample) {
        //     a[key] = null;
        // }
        // console.log(this.resumeForm.education);
        // const b = Array.from(this.resumeForm.education);
        // b.push(a);
        // this.resumeForm.education = b;

        this.educations.push(Object.assign({}, this.educationExample));
        console.log(this.educations);
        this.educations = Array.from(this.educations);

    }

}
