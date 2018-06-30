export class FilterResumesModel {

    // string properties
    public educationStage: string = null;
    public schedule: string = null;
    public experienceAllTime: string = null;
    public resumeLanguage: string = null;
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
        this.resumeLanguage = null;
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
        this.resumeLanguage ? objectRequest['resumeLanguage'] = this.resumeLanguage : null;
        this.employmentType ? objectRequest['employmentType'] = this.employmentType : null;
        this.family ? objectRequest['family'] = this.family : null;
        this.gender ? objectRequest['gender'] = this.gender : null;

        this.photo ? objectRequest['photo'] = this.photo : null;
        this.languages.length ? objectRequest['languages'] = this.languages.map(item => item) : null;


        this.experienceAllTime ? objectRequest['experienceAllTime'] = this.experienceAllTime : null;

        switch (this.experienceAllTime) {
            case ('little'): objectRequest['experienceAllTime']  = {from: 0, to: 3}; break;
            case ('medium'): objectRequest['experienceAllTime']  = {from: 3, to: 5}; break;
            case ('high'): objectRequest['experienceAllTime']  = {from: 5, to: 10}; break;
            case ('moreHigh'): objectRequest['experienceAllTime']  = {from: 10, to: 19}; break;
            case ('highest'): objectRequest['experienceAllTime']  = {from: 20}; break;
            default: null; break;
        }

        // this.salary.from !== 0 ? objectRequest = Object.assign(objectRequest, {salary: {from: this.salary.from}}) : null;
        this.salary.to !== 0 ? objectRequest = Object.assign(objectRequest, {salary: {from: 0, to: this.salary.to}}) : null;

        if (this.salary.to === 'other') {
            objectRequest = Object.assign(objectRequest, {salary: {from: 600000}});
            delete objectRequest.salary.to;
        }

        let age: any =  {};

        if (this.age.from) {
            age.from = this.age.from;
            objectRequest = Object.assign(objectRequest, { age } );
        }

        if (this.age.to) {
            age.from = this.age.from;
            age.to = this.age.to;
            objectRequest = Object.assign(objectRequest, { age } );
        }

        return objectRequest;
    }
}
