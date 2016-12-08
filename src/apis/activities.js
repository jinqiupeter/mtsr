/**
 * 在球场
 * zaiqiuchang.com
 */

import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function getActivities({offset = 0, limit = 10}) {
    return getApi(`${API_ORIGIN}/activities`, {
        offset,
        limit,
    });
}
