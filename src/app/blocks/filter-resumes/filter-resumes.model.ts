import { LocalizationService } from '../../services';

export class FilterResumesModel {

    // string properties
    public search: string = null; // вводится юзером
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
    public photo = false;
    public languages: string[] = [];
    public nationalities: string[] = [];

    // multiple properties
    public salary: any = {
        currency: 'dollars', // dollars/rubles
        from: 0,
        to: 0
    };
    public age: any = {
        from: 0,
        to: 0
    };

    // сброс формы
    public reset(): void {

        this.search = null;
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
        this.nationalities = [];

        this.salary.currency = 'dollars';
        this.salary.from = 0;
        this.salary.to = 0;

        this.age.from = 0;
        this.age.to = 0;

    }


    public getObjectRequest(): any {

        let objectRequest: any = {};

        this.search ? objectRequest['search'] = this.search : null;
        this.educationStage ? objectRequest['educationStage'] = this.educationStage : null;
        this.schedule ? objectRequest['schedule'] = this.schedule : null;
        this.resumeLanguage ? objectRequest['resumeLanguage'] = this.resumeLanguage : null;
        this.employmentType ? objectRequest['employmentType'] = this.employmentType : null;
        this.family ? objectRequest['family'] = this.family : null;
        this.gender ? objectRequest['gender'] = this.gender : null;

        this.photo ? objectRequest['photo'] = this.photo : null;
        this.languages.length ? objectRequest['languages'] = this.languages.map(item => item) : null;
        this.nationalities.length ? objectRequest['nationalities'] = this.nationalities.map(item => item) : null;

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

        if (this.salary.to) {
            objectRequest = {
                ...objectRequest,
                salary: this.salary
            };

            if (this.salary.to === 'other') {
                objectRequest.salary.to = 600000;
                delete objectRequest.salary.from;
            }

            if (LocalizationService.currentLang() === 'ru' ) {
                objectRequest.salary.currency = 'rubles';
            }
        }

        const age: any =  {};

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
