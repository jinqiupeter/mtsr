import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';
import logger from '../logger'

export function register({username = '', mobile = '', password, code}) {
    return postApi(`${API_ORIGIN}/register`, {username, mobile, password, code});
}

export function login({username = '', mobile = '', email = '', password}) {
    username = mobile;
    return getApi(`${API_ORIGIN}/login`, {username, mobile, email, password});
}

export function isLoggedin({username = '', mobile = '', email = '', password}) {
    return getApi(`${API_ORIGIN}/isLoggedin`, {username, mobile, email, password});
}

export function logout() {
    return getApi(`${API_ORIGIN}/logout`);
}

export function editAccount(update) {
    return postApi(`${API_ORIGIN}/account/edit`, update);
}

export function searchXpy(condition) {
    return getApi(`${API_ORIGIN}/searchXpy`, condition);
}

export function changePassword(update) {
    logger.debug("changePassword: ", update);
    return postApi(`${API_ORIGIN}/account/password`, update);
}

export function accountInfo() {
    return getApi(`${API_ORIGIN}/account/info`);
}
