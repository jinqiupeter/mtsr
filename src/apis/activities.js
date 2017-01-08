import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function getActivities({offset = 0, limit = 10}) {
    return getApi(`${API_ORIGIN}/activities`, {
        offset,
        limit,
    });
}

export function updateAttendStatus(info) {
    return  postApi(`${API_ORIGIN}/updateActivityAttendStatus`, info);
}

export function activityDescription(info) {
    return getApi(`${API_ORIGIN}/activityDescription`, info);
}