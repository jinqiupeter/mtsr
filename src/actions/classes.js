/**
 * 在球场
 * zaiqiuchang.com
 */

import {Actions} from 'react-native-router-flux';
import ImageResizer from 'react-native-image-resizer';

import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';

export const RESET_CLASS = 'reset_class';
export const SET_CLASSES = 'set_classes';
export const APPEND_CLASSES = 'append_classes'

export function resetClass() {
    return {
        type: RESET_CLASS,
    };
}

export function attendedClasses({xpybh, offset = 0, cbOk, cbFail, cbFinish}) {
    return (dispatch, getState) => {
        let {object} = getState();
        let attendedClasses;
        apis.attendedClasses({
            xpybh,
            offset,
        }).then((response) => {
            let {data} = response;
            logger.debug("got AttendedClasses: ", data);
            attendedClasses = data.attendedClasses;
            return actions.cacheAttendedClasses(object, attendedClasses);
        })
            .then((action) => {
                dispatch(action);
                let classIds = attendedClasses.map((v) => v.id);
                if (offset == 0) {
                    dispatch({type: SET_CLASSES, classIds});
                } else {
                    dispatch({type: APPEND_CLASSES, classIds});
                }
                if (cbOk) {
                    cbOk();
                }
                if (cbFinish) {
                    cbFinish();
                }
            })
            .catch((error) => {
                dispatch(actions.handleApiError(error));
                if (cbFail) {
                    cbFail();
                }
                if (cbFinish) {
                    cbFinish();
                }
            });
    };
}
