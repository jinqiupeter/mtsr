/**
 * 在球场
 * zaiqiuchang.com
 */

import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';
import logger from '../logger'

export function register({username='', mobile='', password, code}) {
  return postApi(`${API_ORIGIN}/register`, {username, mobile, password, code});
}

export function login({username='', mobile='', email='', password}) {
  username = mobile;
  return getApi(`${API_ORIGIN}/login`, {username, mobile, email, password});
}

export function isLoggedin({username='', mobile='', email='', password}) {
  return getApi(`${API_ORIGIN}/isLoggedin`, {username, mobile, email, password});
}

export function logout() {
  return getApi(`${API_ORIGIN}/logout`);
}

export function editAccount(update) {
  if (update['location'] !== undefined) {
    let {longitude, latitude} = update['location'];
    update['location'] = `${longitude},${latitude}`;
  }

  logger.debug("editAccount: update: ", update);
  return postApi(`${API_ORIGIN}/account/edit`, update);
}

export function editNickname({nickname=''}) {
    return postApi(`${API_ORIGIN}/account/nickname`, nickname);
}

export function accountInfo() {
  return getApi(`${API_ORIGIN}/account/info`);
}
