export const DEFAULT_TYPE = 'Создание';
export const CHANGES_TYPE = 'Изменение';

export const DEFAULT_EXPERIENCE = {
    startMonth: null,
    startYear: null,
    endMonth: null,
    endYear: null,
    present: null,
    organization: null,
    job: null,
    duties: null
};

export const DEFAULT_EDUCATION = {
    stage: null,
    start: null,
    end: null,
    country: null,
    city: null,
    university: null,
    faculty: null,
    specialty: null
};

export const DEFAULT_LANGUAGE = {
    name: null,
    level: null
};

export const DEFAULT_TRAINING = {
    year: null,
    city: null,
    name: null
};

export const DEFAULT_RESUME_FORM = {
    job: null,
    salary: null,
    age: null,
    gender: 'Мужчина',
    family: null,
    experienceAllTime: null,
    experienceAll: {
        oil: {
            exist: false,
            years: null,
            month: null
        },
        mining: {
            exist: false,
            years: null,
            month: null
        }
    },
    businessTrips: 'нет',
    relocation: 'нет',
    schedule: null,
    employmentType: null,
    experience: [Object.assign({}, DEFAULT_EXPERIENCE)],
    educationCountries: {
        russian: false,
        foreign: false
    },
    education: [Object.assign({}, DEFAULT_EDUCATION)],
    languages: [Object.assign({}, DEFAULT_LANGUAGE)],
    trainings: [Object.assign({}, DEFAULT_TRAINING)],
    additionalInformation: null,
    personalQualities: null,
    hobbies: null,
    email: null,
    phoneNumber: null
};

export const DEFAULT_RESUME_IMAGE = {
    file: null,
    data: null
};
