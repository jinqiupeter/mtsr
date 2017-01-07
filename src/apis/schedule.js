import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function selectableClasses({xpybh, limit = 10, offset = 0}) {
    return getApi(`${API_ORIGIN}/selectableClasses`, {xpybh, limit, offset});
}

export function classDescription(info) {
    return getApi(`${API_ORIGIN}/classDescription`, info);
}

export function selectRegular(info) {
    return postApi(`${API_ORIGIN}/selectRegular`, info,  {timeout: 10 * 1000});
}


