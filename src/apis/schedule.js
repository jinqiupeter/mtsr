import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function selectableClasses({xpybh, limit = 10, offset = 0}) {
    return getApi(`${API_ORIGIN}/selectableClasses`, {xpybh, limit, offset});
}

