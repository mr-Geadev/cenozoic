import { STATUSES_INIT } from 'const';

export class RespondModel {
  public _id: string = '5ba1f9ae6c4d81c2ef3771a1';

  public workerId: string = '5adb2ea904e069a23756d163';
  public vacancyId: string = '5aaea74de987190d2745761d';
  public vacancy: any = {
    '_id': '5b8e5daa7ffd8e35d887f779',
    'title': 'Бухгалтер',
    'currency': 'rubles',
    'salaryGROSS': {
      'from': 50000,
      'to': 70000,
    },
    'salaryNET': {
      'from': 40000,
      'to': 60000,
    },
    'country': 2000,
    'city': 2001,
    'experience': {
      'oil': {
        'checked': true,
        'years': 0,
        'months': 5,
      },
      'mining': null,
    },
    'nationalities': [
      'RU',
    ],
    'schedule': 'full',
    'employmentType': 'full',
    'duties': '<p>тест</p>',
    'demands': '<p>тест</p>',
    'conditions': '<p>тест</p>',
    'companyName': 'ООО "НефтьГазПром"',
    'phone': '+79656565566',
    'email': 'jyw09121@nbzmr.com',
    'vacancyLanguage': 'ru',
    'userId': '5b8e4e1f7ffd8e35d887f777',
    'status': 0,
    'creationDate': '2018-09-04T10:25:46.205Z',
  };

  public employerId: string = '5adb2ea904e069a23756d19d';
  public resumeId: string = '5adb2ea904e069a23756d19d';
  public resume: any = {
    '_id': '5b8e59747ffd8e35d887f778',
    'job': 'Бухгалтер',
    'salary': {
      'currency': 'rubles',
      'value': 30000,
    },
    'birthday': '1993-02-03T05:00:00.000Z',
    'fullName': 'Карпов Петр Семенович',
    'resumeLanguage': 'ru',
    'gender': 'man',
    'family': 'single',
    'nationalities': [
      'RU',
    ],
    'experienceTime': {
      'all': {
        'years': 18,
        'months': 8,
      },
      'oil': {
        'years': 0,
        'months': 0,
      },
      'mining': {
        'years': 18,
        'months': 8,
      },
    },
    'businessTrips': true,
    'relocation': false,
    'schedule': 'full',
    'employmentType': 'full',
    'experience': [
      {
        'startMonth': 0,
        'startYear': 2000,
        'endMonth': null,
        'endYear': null,
        'present': true,
        'type': 'mining',
        'organization': 'Тест',
        'job': 'Тест',
        'duties': 'Тест',
      },
    ],
    'education': [
      {
        'stage': 'middle',
        'start': 2000,
        'end': 2005,
        'country': 1000,
        'city': 1009,
        'university': 'Тест',
        'faculty': null,
        'specialty': null,
      },
    ],
    'languages': [
      {
        'name': 'ru',
        'level': 'native',
      },
    ],
    'trainings': [],
    'additionalInformation': null,
    'personalQualities': null,
    'hobbies': '<p>Лукойл</p>',
    'email': 'liadh@mail.ru',
    'phoneNumber': '+79052225555',
    'photoURL': null,
    'userId': '5b8e4aaf7ffd8e35d887f776',
    'status': 0,
    'creationDate': '2018-09-04T10:07:48.767Z',
  };

  public status: number = 0;
  public entity: string = 'offer';

  public workerArchive: boolean = false;
  public employerArchive: boolean = false;
  public viewed: boolean = true;

  public creationDate: string = '2018-09-19T07:24:30.015Z';

  respondStatuses: {};

  offerStatuses: {
    AWAITING: 0,
    WAIT_QUESTIONNAIRE: 3,
    QUESTIONNAIRE_DONE: 4,
    APPROVED: 5,
    REJECTED: 6,
  };

  // TODO: временно (нет)
  constructor(status, entity?, viewed?, workerArchive?, employerArchive?) {
    this.status = STATUSES_INIT[status];
    entity ? this.entity = entity : null;
    workerArchive ? this.workerArchive = workerArchive : null;
    employerArchive ? this.employerArchive = employerArchive : null;
    this.viewed = viewed;
  }
}

/*

 */
