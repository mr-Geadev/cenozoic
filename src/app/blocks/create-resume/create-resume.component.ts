import { Component } from '@angular/core';
import { CREATE_RESUME } from "../../constants";
import { HttpClient } from "@angular/common/http";




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

    }

    send() {
        console.log(this.resumeForm);
        this.http.post(CREATE_RESUME, this.resumeForm)
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

    public loadingFile: string = "Загрузить фото";

    fileChange(event) {
        console.log(this.loadingFile);
        let fileList: FileList = event.target.files;
        this.loadingFile = fileList[0].name;
    }

}
