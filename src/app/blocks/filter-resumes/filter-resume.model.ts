export class FilterResumesModel {

    // string properties
    public educationStage: string = null;
    public schedule: string = null;
    public experienceAllTime: string = null;
    public languagesResume: string = null;
    public employmentType: string = null;
    public family: string = null;
    public gender: string = null;
    public placeResidence: string = null;

    // other properties
    public photo: boolean = false;
    public languages: string[] = [];

    // multiple properties
    public salary: any = {
        from: 0,
        to: 0
    };
    public age: any = {
        from: 0,
        to: 0
    };

    // сброс формы
    public reset(): void {

        this.educationStage = null;
        this.schedule = null;
        this.experienceAllTime = null;
        this.languagesResume = null;
        this.employmentType = null;
        this.family = null;
        this.gender = null;

        this.photo = false;
        this.languages.length = 0;

        this.salary.from = 0;
        this.salary.to = 0;

        this.age.from = 0;
        this.age.to = 0;

    }


    public getObjectRequest(): any {

        let objectRequest: any = {};

        this.educationStage ? objectRequest['educationStage'] = this.educationStage : null;
        this.schedule ? objectRequest['schedule'] = this.schedule : null;
        this.experienceAllTime ? objectRequest['experienceAllTime'] = this.experienceAllTime : null;
        this.languagesResume ? objectRequest['languagesResume'] = this.languagesResume : null;
        this.employmentType ? objectRequest['employmentType'] = this.employmentType : null;
        this.family ? objectRequest['family'] = this.family : null;
        this.gender ? objectRequest['gender'] = this.gender : null;

        this.photo ? objectRequest['photo'] = this.photo : null;
        this.languages.length ? objectRequest['languages'] = this.languages.map(item => item) : null;


        // this.salary.from !== 0 ? objectRequest = Object.assign(objectRequest, {salary: {from: this.salary.from}}) : null;
        this.salary.to !== 0 ? objectRequest = Object.assign(objectRequest, {salary: {from: 0, to: this.salary.to}}) : null;

        if (this.salary.to === 'other') {
            objectRequest = Object.assign(objectRequest, {salary: {from: 600000}});
            delete objectRequest.salary.to;
        }

        this.age.from !== 0 ? objectRequest = Object.assign(objectRequest, {age: {from: this.age.from}}) : null;
        this.age.to !== 0 ? objectRequest = Object.assign(objectRequest, {age: {to: this.age.to}}) : null;

        return objectRequest;
    }
}
