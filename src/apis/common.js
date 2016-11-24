/**
 * 在球场
 * zaiqiuchang.com
 */

import {Actions} from 'react-native-router-flux';
import URL from 'url';

import logger from '../logger';
import {store} from '../setup';
import {loadingStart, loadingEnd} from '../actions';
import {HttpError, ResultError} from './error';
import {HTTP_STATUS} from './httpStatus';
import {fetchUrl as fetch} from '../utils';
import * as helpers from '../components/helpers';

export function getApi(url, query={}, {method='GET', headers={}, timeout=5000}={}) {
    let {account, object} = store.getState();
    if (account.userId) {
        let user = helpers.userFromCache(object, account.userId);
        headers["session"] = user.session;
    }

    let urlParts = URL.parse(url, true);
    urlParts.query = query;
    url = URL.format(urlParts);
    let request = new Request(url, {method, headers, timeout});
    return fetchApi(request, timeout);
}

export function postApi(url, data={}, {method='POST', headers={}, timeout=5000}={}) {
    let {account, object} = store.getState();
    logger.debug("inside postApi, cache object is: ", object, account);
    if (account.userId) {
        let user = helpers.userFromCache(object, account.userId);
        headers["session"] = user.session;
    }

    if (Object.keys(data).length == 0) {
        data._ = 'fix android empty body bug';
    }
    let body = null;
    if (headers['Content-Type']
        && headers['Content-Type'].match('multipart\/form-data')) {
        body = new FormData();
        for (let [k, v] of Object.entries(data)) {
            body.append(k, v);
        }
    } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data);
    }

    let request = new Request(url, {method, headers, body, timeout});
    logger.debug("posting :, body ", request, body, data);
    return fetchApi(request, timeout);
}


export async function fetchApi(request, timeout=5000) {
    let responseJson = null;
    try {
        store.dispatch(loadingStart());

        logger.debug(request.url);
        let response = await fetch(request, {timeout});
        if (!response.ok) {
            throw new HttpError(response.status, HTTP_STATUS[response.status]);
        }

        responseJson = await response.json();
        logger.debug("in fetchApi, responseJson", responseJson);
        let {code, message, data} = responseJson;
        if (code != 0) {
            throw new ResultError(code, message, data);
        }
    }
    catch (error) {
        if (error === undefined) {
            error = new HttpError(504, HTTP_STATUS[504]);
        } else if (error instanceof TypeError) {
            error = new HttpError(503, "网络不通");
        }
        return Promise.reject(error);
    }
    finally {
        store.dispatch(loadingEnd());
    }
    return responseJson;
}
