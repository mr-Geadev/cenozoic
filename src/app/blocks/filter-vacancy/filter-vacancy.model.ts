import { LocalizationService } from '../../services';

export class FilterVacancyModel {

    // string properties
    public search: string = null; // вводится юзером
    public city: number = null; // код региона (он же город)
    public educationStage: string = null; // образование disabled
    public experienceAllTime: string = null; // стаж disabled
    public languages: string[] = []; // знание языков disabled
    public employmentType: string = null; // метод работы: full/part/time/internship
    public schedule: string = null; // график: full/remote/watch
    public social: boolean = false; // соц пакет disabled

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
        this.experienceAllTime = null;
        this.languages = [];
        this.employmentType = null;
        this.schedule = null;
        this.social = false;

        this.salary.currency = 'dollars';
        this.salary.from = 0;

    }


    public getObjectRequest(): any {

        let objectRequest: any = {};

        this.search ? objectRequest['search'] = this.search : null;
        this.city ? objectRequest['city'] = this.city : null;
        this.employmentType ? objectRequest['employmentType'] = this.employmentType : null;
        this.schedule ? objectRequest['schedule'] = this.schedule : null;

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
