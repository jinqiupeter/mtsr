/**
 * 在球场
 * zaiqiuchang.com
 */

import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function postInfo(id) {
    return getApi(`${API_ORIGIN}/post/info`, {id});
}

export function postInfos(ids) {
    return getApi(`${API_ORIGIN}/post/infos`, {ids: ids.join(',')});
}

export function attendedClasses({xpybh, limit = 20, offset = 0}) {
    return getApi(`${API_ORIGIN}/attendedClasses`, {xpybh, limit, offset});
}

export function unattendedClasses({xpybh, limit=20, offset=0}) {
    return getApi(`${API_ORIGIN}/unattendedClasses`, {xpybh, limit, offset});
}
