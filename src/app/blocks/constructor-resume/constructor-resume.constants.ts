export const DEFAULT_TYPE = 'Создание';
export const CHANGES_TYPE = 'Изменение';

export const DEFAULT_EXPERIENCE = {
    startMonth: null,
    startYear: null,
    endMonth: null,
    endYear: null,
    present: false,
    type: null,
    organization: null,
    job: null,
    duties: null
};

export const DEFAULT_EDUCATION = {
    stage: null,
    start: null,
    end: null,
    country: 'Россия',
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
    durability: null,
    country: '',
    city: null,
    name: null,
    document: false
};

export const DEFAULT_RESUME_FORM = {
    job: null,
    salary: null,
    birthday: null,
    fullName: null,
    resumeLanguage: 'ru',
    gender: 'man',
    family: null,
    experienceAllTime: null,
    experienceAll: {
        oil: {
            years: null,
            month: null
        },
        mining: {
            years: null,
            month: null
        }
    },
    businessTrips: false,
    relocation: false,
    schedule: null,
    employmentType: null,
    experience: [
        // Object.assign({}, DEFAULT_EXPERIENCE)
    ],
    education: [
        // Object.assign({}, DEFAULT_EDUCATION)
    ],
    languages: [
        // Object.assign({}, DEFAULT_LANGUAGE)
    ],
    trainings: [
        // Object.assign({}, DEFAULT_TRAINING)
    ],
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
