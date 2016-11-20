/**
 * 在球场
 * zaiqiuchang.com
 */

import * as utils from '../utils';
import {API_ORIGIN, CRM_ORIGIN} from '../config';
import {getApi, postApi} from './';

export function uploadFile(uri, type, name) {
    if (name === undefined) {
        name = utils.basename(uri);
    }
    return postApi(`${CRM_ORIGIN}/imageUploader`,
        {'file': {uri, type, name}},
        {headers: {'Content-Type': 'multipart/form-data'}});
}

export function fileInfo(id) {
    return getApi(`${API_ORIGIN}/file/info`, {id});
}

export function fileInfos(ids) {
    return getApi(`${API_ORIGIN}/file/infos`, {ids: ids.join(',')});
}
