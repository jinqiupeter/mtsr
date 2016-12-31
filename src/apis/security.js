import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function sendVerifyCode({mobile}) {
  return getApi(`${API_ORIGIN}/smsCode`, {mobile});
}
