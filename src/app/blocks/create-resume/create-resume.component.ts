import { Component, OnInit } from '@angular/core';
import { CREATE_RESUME } from "../../constants";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../../services/user.service";
import { ResumeService } from "../../services/resume.service";




@Component({
    selector: 'create-resume',
    templateUrl: './create-resume.component.html',
    styleUrls: ['./create-resume.component.less']
})
export class CreateResumeComponent implements OnInit{
    private confirmed: boolean = false;

    private experienceItem: any = {
        startMonth: null,
        startYear: null,
        endMonth: null,
        endYear: null,
        present: null,
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
        experienceAllTime: null,
        experienceAll: {
            oil: {
                exist: false,
                years: null,
                month: null
            },
            mining: {
                exist: false,
                years: null,
                month: null
            }
        },
        businessTrips: "нет",
        relocation: "нет",
        schedule: null,
        employmentType: null,
        experience: [ Object.assign({},this.experienceItem) ],
        educationCountries: {
            russian: false,
            foreign: false
        },
        education: [ Object.assign({},this.educationItem) ],
        languages: [ Object.assign({},this.languageItem) ],
        trainings: [ Object.assign({},this.trainingItem) ],
        additionalInformation: null,
        personalQualities: null,
        hobbies: null,
        email: null,
        phoneNumber: null
    };

    public cleanResumeForm = Object.assign({}, this.resumeForm);

    constructor(private http: HttpClient,
                private userService: UserService,
                private resumeService: ResumeService) {

    }

    public isAuthorized: boolean = false;

    ngOnInit(): void {

        this.userService.user$
            .subscribe((user) => {
                this.isAuthorized = !!user;
                if (user) {
                    console.log(user);
                }
            });

        this.resumeService.resume$
            .subscribe((resume)=>{
                for (let key in resume) {
                    this.resumeForm[key] = resume[key];
                }
            });
    }


    public addWorkplace(): void {
        this.resumeForm.experience.push(Object.assign({},this.experienceItem));
    }
    public addEducation(): void {
        this.resumeForm.education.push(Object.assign({},this.educationItem));
    }
    public addLanguage(): void {
        this.resumeForm.languages.push(Object.assign({},this.languageItem));
    }
    public addTraining(): void {
        this.resumeForm.trainings.push(Object.assign({},this.trainingItem));
    }


    public loadingPhotoButton: string = "Загрузить фото";

    fileChange(event) {
        let fileList: FileList = event.target.files;
        this.loadingPhotoButton = fileList[0].name;
        console.log(fileList[0]);
    }

    public send():void {

        let months = +this.resumeForm.experienceAll.oil.month + +this.resumeForm.experienceAll.mining.month;
        let years = +this.resumeForm.experienceAll.oil.years + +this.resumeForm.experienceAll.mining.years + Math.floor(months/12);
        this.resumeForm.experienceAllTime = `${years};${months % 12}`;

        this.http.post(CREATE_RESUME, this.resumeForm)
            .subscribe((res: any) => {
                this.confirmed = res.code === 200;

                if (res.success === true) {
                    this.resumeForm = Object.assign({}, this.cleanResumeForm);
                    alert('Ваше резюме отправлено!')
                } else {
                    alert('Отправка не удалась');
                }

            })
    };

}
