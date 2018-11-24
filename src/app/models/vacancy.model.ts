export class VacancyModel {
  _id: null;
  userId: string = null;

  status: number = 0;

  answered: boolean = false;
  title: null;
  currency: null;
  salaryGROSS: {
    from: 0,
    to: 0
  };
  salaryNET: {
    from: 0,
    to: 0
  };
  city: null;
  country: null;
  experience: {
    oil: {
      checked: null,
      years: 0,
      months: 0,
    },
    mining: {
      checked: null,
      years: 0,
      months: 0,
    }
  };
  nationalities: string[];
  schedule: null;
  employmentType: null;
  duties: null;
  demands: null;
  conditions: null;

  expAll: number = 0;
  salaryFrom: number = 0;
  salaryTo: number = 0;

  companyName: string = null;
  phone: string = null;
  email: string = null;
  photoURL: string = null;

  clearVacancy: any = null; // содержит в себе ввакансию, пришедшую с сервака

  constructor(vacancy) {
    this.clearVacancy = vacancy;
    this.answered = vacancy.answered || false;
    this._id = vacancy._id || null;
    this.userId = vacancy.userId || null;
    this.title = vacancy.title || null;
    this.currency = vacancy.currency || null;
    this.status = vacancy.status || null;
    this.photoURL = vacancy.photoURL || null;

    this.salaryGROSS = vacancy.salaryGROSS || {
      from: 0,
      to: 0,
    };

    this.salaryNET = vacancy.salaryNET || {
      from: 0,
      to: 0,
    };

    this.city = vacancy.city || null;
    this.country = vacancy.country || null;
    this.experience = {
      oil: vacancy.experience.oil || {
        checked: false,
        years: 0,
        months: 0,
      },
      mining: vacancy.experience.mining || {
        checked: false,
        years: 0,
        months: 0,
      },
    };

    this.nationalities = vacancy.nationalities || [];
    this.schedule = vacancy.schedule || null;
    this.employmentType = vacancy.employmentType || null;
    this.duties = vacancy.duties || null;
    this.demands = vacancy.demands || null;
    this.conditions = vacancy.conditions || null;

    this.companyName = vacancy.companyName || null;
    this.phone = vacancy.phone || null;
    this.email = vacancy.email || null;

    this.expAll = this.experience.oil.years || 0 + this.experience.mining.years || 0;
    this.salaryFrom = (this.salaryGROSS.from || 0 + this.salaryNET.from || 0) / 2;
    this.salaryTo = (this.salaryGROSS.to || 0 + this.salaryNET.to || 0) / 2;
  }
}