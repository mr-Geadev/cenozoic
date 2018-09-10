import { LocalizationService } from '../../services';

export class FilterVacancyModel {

    // string properties
    public search: string = null; // вводится юзером
    public city: number = null; // код региона (он же город)
    public educationStage: string = null; // образование disabled
    public experienceTime: string = null;
    public experienceType: string = null; // в каком типе прмоышленности опыт
    public vacancyLanguage: string = null;
    public employmentType: string = null; // метод работы: full/part/time/internship
    public schedule: string = null; // график: full/remote/watch
    public social: boolean = false; // соц пакет disabled

    public nationalities: string[] = []; // соц пакет disabled
    // multiple properties
    public salary: any = {
        currency: 'dollars', // dollars/rubles
        from: 0
    };

    // сброс формы
    public reset(): void {

        this.search = null;
        this.city = null;
        this.educationStage = null;
        this.experienceTime = null;
        this.experienceType = null;
        this.vacancyLanguage = null;
        this.employmentType = null;
        this.schedule = null;
        this.social = false;

        this.salary.currency = 'dollars';
        this.salary.from = 0;

        this.nationalities = [];

    }

    public getObjectRequest(): any {

        let objectRequest: any = {};

        this.search ? objectRequest['search'] = this.search : null;
        this.city ? objectRequest['city'] = this.city : null;
        this.employmentType ? objectRequest['employmentType'] = this.employmentType : null;
        this.schedule ? objectRequest['schedule'] = this.schedule : null;
        this.vacancyLanguage ? objectRequest['vacancyLanguage'] = this.vacancyLanguage : null;
        this.nationalities.length ? objectRequest['nationalities'] = this.nationalities.map(item => item) : null;

        if (this.experienceType && this.experienceTime) {
            switch (this.experienceTime) {
                case ('littlest'): objectRequest['experienceTime']  = {from: 0, to: 1}; break;
                case ('little'): objectRequest['experienceTime']  = {from: 1, to: 3}; break;
                case ('medium'): objectRequest['experienceTime']  = {from: 3, to: 5}; break;
                case ('high'): objectRequest['experienceTime']  = {from: 5, to: 10}; break;
                case ('moreHigh'): objectRequest['experienceTime']  = {from: 10, to: 19}; break;
                case ('highest'): objectRequest['experienceTime']  = {from: 20}; break;
                default: objectRequest['experienceTime']  = {from: 0}; break;
            }

            objectRequest['experienceTime'] = Object.assign(objectRequest['experienceTime'], {type: this.experienceType});
        }

        if (this.salary.from) {
            objectRequest = {
                ...objectRequest,
                salary: this.salary
            };

            if (this.salary.from === 'other') {
                objectRequest.salary.from = 600000;
            }

            if (LocalizationService.currentLang() === 'ru' ) {
                objectRequest.salary.currency = 'rubles';
            }
        }

        console.log(objectRequest);

        return objectRequest;
    }
}
