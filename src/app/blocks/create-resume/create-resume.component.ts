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

    private experienceItem: any = {
        time: {
            startMonth: null,
            startYear: null,
            endMonth: null,
            endYear: null,
            present: null
        },
        organization: null,
        job: null,
        duties: null
    };
    private educationItem: any = {
        stage: null,
        start: null,
        end: null,
        country: null,
        city: null,
        university: null,
        faculty: null,
        specialty: null
    }
    private languageItem: any = {
        name: null,
        level: null
    };
    private trainingItem: any = {
        year: null,
        city: null,
        name: null
    };
    public resumeForm: any = {
        job: null,
        salary:null,
        age:null,
        gender: "Мужчина",
        family:null,
        experienceAll: {
            oil: {
                years: null,
                month: null
            },
            mining: {
                years: null,
                month: null
            }
        },
        businessTrips: "да",
        relocation: "да",
        schedule: null,
        employmentType: null,
        experience: [ this.experienceItem ],
        educationCountries: {
            russian: false,
            foreign: false
        },
        education: [ this.educationItem ],
        languages: [ this.languageItem ],
        trainings: [ this.trainingItem ],
        additionalInformation: null,
        personalQualities: null,
        hobbies: null,
        email: null,
        phoneNumber: null
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


    public loadingPhotoButton: string = "Загрузить фото";

    fileChange(event) {
        let fileList: FileList = event.target.files;
        this.loadingPhotoButton = fileList[0].name;
    }

}
