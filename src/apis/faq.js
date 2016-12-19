/**
 * Created by peter on 16/12/2016.
 */
import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function getFaq({limit = 10, offset = 0}) {
    return getApi(`${API_ORIGIN}/faq`, {limit, offset});
}

export function getFeedback({xpybh, limit = 10, offset = 0}) {
    return getApi(`${API_ORIGIN}/feedback`, {xpybh, limit, offset});
}
