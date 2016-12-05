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
export const SET_ATTENDED_CLASSES = 'set_attended_classes';
export const APPEND_ATTENDED_CLASSES = 'append_attended_classes';
export const SET_UNATTENDED_CLASSES = 'set_unattended_classes';
export const APPEND_UNATTENDED_CLASSES = 'append_unattended_classes';
export const CHANGE_START_DAY = "change_start_day";

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
            attendedClasses = data.attendedClasses.filter((v) => {return !!v.id});
            logger.debug("got AttendedClasses: ", attendedClasses);
            return actions.cacheAttendedClasses(object, attendedClasses);
        })
            .then((action) => {
                dispatch(action);
                let classIds = attendedClasses.map((v) => v.id);
                if (offset == 0) {
                    dispatch({type: SET_ATTENDED_CLASSES, classIds});
                } else {
                    dispatch({type: APPEND_ATTENDED_CLASSES, classIds});
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


export function unattendedClasses({xpybh, offset = 0, cbOk, cbFail, cbFinish}) {
    return (dispatch, getState) => {
        let {object} = getState();
        let unattendedClasses;
        apis.unattendedClasses({
            xpybh,
            offset,
        }).then((response) => {
            let {data} = response;
            unattendedClasses = data.unattendedClasses.filter((v) => {return !!v.id});
            logger.debug("got UnattendedClasses: ", unattendedClasses);
            return actions.cacheUnattendedClasses(object, unattendedClasses);
        })
            .then((action) => {
                let {object} = getState();
                logger.debug("object after cached: ", object);
                dispatch(action);
                let classIds = unattendedClasses.map((v) => v.id);
                logger.debug("calling SET_UNATTENDED_CLASSES with: ", classIds);
                if (offset == 0) {
                    dispatch({type: SET_UNATTENDED_CLASSES, classIds});
                } else {
                    dispatch({type: APPEND_UNATTENDED_CLASSES, classIds});
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

export function changeStartDayAction(startDate) {
    return {
        type: CHANGE_START_DAY,
        startDate
    };
}

export function changeStartDay(sceneKey, changeTo) {
    return (dispatch, getState) => {
        let {input} = getState();
        dispatch(actions.setSceneState(sceneKey, {calendarPickerVisible: false}));

        dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
            let startDate = changeTo ? changeTo : input[sceneKey].startDate;
            //let {startDate} = input[sceneKey];
            dispatch(changeStartDayAction(startDate));
        }));
    };
}
