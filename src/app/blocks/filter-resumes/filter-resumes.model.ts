export class FilterResumesModel {

    // string properties
    public educationStage: string = null;
    public experienceTime: string = null;
    public experienceType: string = null; // в каком типе прмоышленности опыт
    public resumeLanguage: string = null;
    public employmentType: string = null;
    public schedule: string = null;
    public family: string = null;
    public gender: string = null;
    public placeResidence: string = null; // disabled

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
        this.experienceTime = null;
        this.experienceType = null;
        this.resumeLanguage = null;
        this.employmentType = null;
        this.schedule = null;
        this.family = null;
        this.gender = null;

        this.photo = false;
        this.languages = [];

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

        switch (this.experienceTime) {
            case ('littlest'): objectRequest['experienceTime']  = {from: 0, to: 1}; break;
            case ('little'): objectRequest['experienceTime']  = {from: 1, to: 3}; break;
            case ('medium'): objectRequest['experienceTime']  = {from: 3, to: 5}; break;
            case ('high'): objectRequest['experienceTime']  = {from: 5, to: 10}; break;
            case ('moreHigh'): objectRequest['experienceTime']  = {from: 10, to: 19}; break;
            case ('highest'): objectRequest['experienceTime']  = {from: 20}; break;
            default: objectRequest['experienceTime']  = {from: 0}; break;
        }

        objectRequest['experienceTime'] = Object.assign(objectRequest['experienceTime'], {type: this.experienceType || 'all'});

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
