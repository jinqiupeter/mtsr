import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function postInfo(id) {
    return getApi(`${API_ORIGIN}/post/info`, {id});
}

export function postInfos(ids) {
    return getApi(`${API_ORIGIN}/post/infos`, {ids: ids.join(',')});
}

export function attendedClasses({limit = 10, offset = 0}) {
    return getApi(`${API_ORIGIN}/attendedClasses`, {limit, offset});
}

export function unattendedClasses({limit=10, offset=0}) {
    return getApi(`${API_ORIGIN}/unattendedClasses`, {limit, offset});
}

export function afterClassInstruction({kcbxxbh, skqkrq, kckssj, kcjssj}) {
    return getApi(`${API_ORIGIN}/afterClassInstruction`, {kcbxxbh, skqkrq, kckssj, kcjssj});
}

export function updateAbsence({applyAbsence, kcbxxbh, date}) {
    return postApi(`${API_ORIGIN}/updateAbsence`, {applyAbsence, kcbxxbh, date});
}

export function signInClass({kcbxxbh, date}) {
    return postApi(`${API_ORIGIN}/signInClass`, {kcbxxbh, date});
}
