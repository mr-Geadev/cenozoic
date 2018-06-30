export class FilterVacancyModel {

    // string properties

    public region: string = null; // регион
    public salary: string = null; // оклад
    public educationStage: string = null; // образование
    public experienceAllTime: string = null; // стаж
    public languages: string[] = []; // знание языков
    public employmentType: string = null; // метод работы
    public schedule: string = null; // график
    public social: boolean = false; // соц пакет

    // сброс формы
    public reset(): void {

        this.region = null;
        this.salary = null;
        this.educationStage = null;
        this.experienceAllTime = null;
        this.languages = [];
        this.employmentType = null;
        this.schedule = null;
        this.social = false;

    }


    public getObjectRequest(): any {

        let objectRequest: any = {};

        // this.educationStage ? objectRequest['educationStage'] = this.educationStage : null;
        // this.schedule ? objectRequest['schedule'] = this.schedule : null;
        // this.experienceAllTime ? objectRequest['experienceAllTime'] = this.experienceAllTime : null;
        // this.languagesResume ? objectRequest['languagesResume'] = this.languagesResume : null;
        // this.employmentType ? objectRequest['employmentType'] = this.employmentType : null;
        // this.family ? objectRequest['family'] = this.family : null;
        // this.gender ? objectRequest['gender'] = this.gender : null;
        //
        // this.photo ? objectRequest['photo'] = this.photo : null;
        // this.languages.length ? objectRequest['languages'] = this.languages.map(item => item) : null;
        //
        //
        // // this.salary.from !== 0 ? objectRequest = Object.assign(objectRequest, {salary: {from: this.salary.from}}) : null;
        // this.salary.to !== 0 ? objectRequest = Object.assign(objectRequest, {salary: {from: 0, to: this.salary.to}}) : null;
        //
        // if (this.salary.to === 'other') {
        //     objectRequest = Object.assign(objectRequest, {salary: {from: 600000}});
        //     delete objectRequest.salary.to;
        // }
        //
        // this.age.from !== 0 ? objectRequest = Object.assign(objectRequest, {age: {from: this.age.from}}) : null;
        // this.age.to !== 0 ? objectRequest = Object.assign(objectRequest, {age: {to: this.age.to}}) : null;

        return objectRequest;
    }
}
