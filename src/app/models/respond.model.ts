import { STATUSES_INIT } from 'const';

export class RespondModel {
  public _id: string = null;

  public workerId: string = null;
  public vacancyId: string = null;
  public vacancy: any = {};

  public employerId: string = null;
  public resumeId: string = null;
  public resume: any = {};

  public status: number = 0;
  public entity: string = null;

  public workerArchive: boolean = false;
  public employerArchive: boolean = false;
  public viewed: boolean = true;

  public creationDate: string = null;

  constructor(respond) {
    this._id = respond._id;
    this.workerId = respond.workerId;
    this.vacancyId = respond.vacancyId;
    this.vacancy = respond.vacancy;
    this.employerId = respond.employerId;
    this.resumeId = respond.resumeId;
    this.resume = respond.resume;
    this.status = STATUSES_INIT[respond.status];
    this.entity = respond.entity;
    this.workerArchive = respond.workerArchive;
    this.employerArchive = respond.employerArchive;
    this.viewed = respond.viewed;
    this.creationDate = respond.creationDate;
  }
}

/*
  offerStatuses: {
    AWAITING: 0,
    WAIT_QUESTIONNAIRE: 3,
    QUESTIONNAIRE_DONE: 4,
    APPROVED: 5,
    REJECTED: 6,
  };
 */
