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

export function attendedClasses({xpybh, limit = 10, offset = 0}) {
    return getApi(`${API_ORIGIN}/attendedClasses`, {xpybh, limit, offset});
}

export function unattendedClasses({xpybh, limit=10, offset=0}) {
    return getApi(`${API_ORIGIN}/unattendedClasses`, {xpybh, limit, offset});
}

export function afterClassInstruction({kcbxxbh, skqkrq, kckssj, kcjssj}) {
    return getApi(`${API_ORIGIN}/afterClassInstruction`, {kcbxxbh, skqkrq, kckssj, kcjssj});
}
