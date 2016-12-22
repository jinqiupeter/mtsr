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

export function createFeedback({xpybh, feedback}) {
    return postApi(`${API_ORIGIN}/feedback`, {xpybh, feedback})
}

export function getReferral({xpybh, limit = 10, offset = 0}) {
    return getApi(`${API_ORIGIN}/referral`, {xpybh, limit, offset});
}

export function createReferral({xpybh, xm, csrq, mqxm, mqdh, fqxm, fqdh}) {
    return postApi(`${API_ORIGIN}/referral`, {xpybh, xm, csrq, mqxm, mqdh, fqxm, fqdh})
}
