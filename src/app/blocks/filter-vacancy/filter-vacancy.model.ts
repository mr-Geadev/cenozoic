export class FilterVacancyModel {

    // string properties

    public city: string = null; // регион (он же город)
    public salary: string = null; // оклад disabled
    public educationStage: string = null; // образование disabled
    public experienceAllTime: string = null; // стаж disabled
    public languages: string[] = []; // знание языков disabled
    public employmentType: string = null; // метод работы: full/part/time/internship
    public schedule: string = null; // график: full/remote/watch
    public social: boolean = false; // соц пакет disabled

    // сброс формы
    public reset(): void {

        this.city = null;
        this.salary = null;
        this.educationStage = null;
        this.experienceAllTime = null;
        this.languages = [];
        this.employmentType = null;
        this.schedule = null;
        this.social = false;

    }


    public getObjectRequest(): any {

        const objectRequest: any = {};

        this.city ? objectRequest['city'] = this.city : null;
        this.employmentType ? objectRequest['employmentType'] = this.employmentType : null;
        this.schedule ? objectRequest['schedule'] = this.schedule : null;

        return objectRequest;
    }
}
