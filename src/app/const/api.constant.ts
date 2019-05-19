import { environment } from '../../environments/environment';

const url = environment.apiUrl;

export const CREATE_RESUME = url + '/api/v1/resume/create';
export const SIGN_IN = url + '/api/v1/authorize';
export const SIGN_UP = url + '/api/v1/register';
export const LOG_OUT = url + '/api/v1/logout';
export const USER_INFO = `${url}/api/v1/user/info`;
export const CHANGE_PASSWORD = url + '/api/v1/user/password/change';
export const CHANGE_USER_INFO = url + '/api/v1/worker/profile/parameters/change';
export const REMOVE_USER = url + '/api/v1/user/resume/remove';
export const CREATE_VACANCY = url + '/api/v1/employer/vacancy/create';
export const EDIT_VACANCY = url + '/api/v1/employer/vacancy/edit';
export const LIST_VACANCY = url + '/api/v1/vacancy/get/all';
export const LIST_VACANCY_USER = url + '/api/v1/employer/vacancy/all';
export const GET_VACANCY_BY_ID = url + '/api/v1/vacancy/get/one';

export const IMG_URL = environment.imgIUrl;
