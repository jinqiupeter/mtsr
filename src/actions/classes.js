/**
 * 在球场
 * zaiqiuchang.com
 */

import {Actions} from 'react-native-router-flux';
import ImageResizer from 'react-native-image-resizer';

import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';

import parse from 'date-fns/parse';
import isAfter from 'date-fns/is_after';
import eachDay from 'date-fns/each_day'
import isSameDay from 'date-fns/is_same_day';
import isBefore from 'date-fns/is_before';

import * as helpers from '../components/helpers';

export const RESET_CLASS = 'reset_class';
export const SET_ATTENDED_CLASSES = 'set_attended_classes';
export const APPEND_ATTENDED_CLASSES = 'append_attended_classes';
export const SET_UNATTENDED_CLASSES = 'set_unattended_classes';
export const APPEND_UNATTENDED_CLASSES = 'append_unattended_classes';
export const CHANGE_START_DAY = "change_start_day";
export const SET_INSTRUCTION = "set_instruction";

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

function expandUnattendedClasses(packedUnattendedClasses, startDate = new Date()) {
    let expanded =  packedUnattendedClasses.reduce((accumulated, packedUnattendedClass) => {
        if (packedUnattendedClass.type == 1) {
            // regular class
            let endDate = parse(packedUnattendedClass.enddate);
            if (isAfter(endDate, accumulated.endDate)) {
                // extend end range
                let newDays = eachDay(accumulated.endDate, endDate).map((v) => {
                    return {hasClass: false, date: v, classes: []};
                });

                accumulated.days = accumulated.days.concat(newDays);
                accumulated.endDate = endDate;
            }

            accumulated.days = accumulated.days.map((v) => {
                if (v.date.getDay() == packedUnattendedClass.kcxq) {
                    let classes = v.classes || [];
                    classes.push({...packedUnattendedClass});
                    return {hasClass: true, date: v.date, classes: classes}
                } else {
                    return v;
                }
            });
        }
        else if (packedUnattendedClass.type == 2) {
            // makeup class
            let found = false;
            packedUnattendedClass.date = parse(packedUnattendedClass.date);

            accumulated.days = accumulated.days.map((v) => {
                if (isSameDay(v.date, packedUnattendedClass.date)) {
                    let classes = v.classes || [];
                    classes.push({...packedUnattendedClass});
                    found = true;
                    return {hasClass: true, date: v.date, classes: classes}
                } else {
                    return v;
                }
            });

            if (!found) {
                // this makeup class is not in the range of regular classes
                accumulated.days.push({hasClass: true,
                    date: packedUnattendedClass.date,
                    classes: [packedUnattendedClass]})
            }
        }

        return accumulated;
    }, {days: [], endDate: startDate});

    return expanded.days.map((v, index) => {
       return {...v, id:index};
    });
}

export function moreUnattendedClassesFromCache({currentLength = 0, sceneKey}) {
    return (dispatch, getState) => {
        let {object, input} = getState();
        let startDate = input[sceneKey].startDate;
        let startIndex = Object.values(object.unattendedClasses).findIndex((v) => {
            return isSameDay(v.date, startDate) || isAfter(v.date, startDate);
        });
        if (startIndex === 'undefined') {
            return;
        }

        let classIds = Object.values(object.unattendedClasses)
            .slice(startIndex, startIndex + currentLength + 10)
            .map((v) => v.id);

        dispatch({type: SET_UNATTENDED_CLASSES, classIds});
    }
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
            let classes = data.unattendedClasses.filter((v) => {return !!v.id});
            logger.debug("got UnattendedClasses: ", classes);
            unattendedClasses = expandUnattendedClasses(classes);
            return actions.cacheUnattendedClasses(object, unattendedClasses);
        })
        .then((action) => {
            let {object} = getState();
            dispatch(action);
            // always show the first 10 expanded classes
            let classIds = unattendedClasses.map((v) => v.id).slice(0, 10);
            dispatch({type: SET_UNATTENDED_CLASSES, classIds});

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
            dispatch(changeStartDayAction(startDate));
            dispatch(moreUnattendedClassesFromCache({sceneKey}));
        }));
    };
}

export function afterClassInstruction({kcbxxbh, skqkrq, kckssj, kcjssj, cbOk, cbFail, cbFinish}) {
    return (dispatch, getState) => {
        let {object} = getState();
        let instruction;
        apis.afterClassInstruction({
            kcbxxbh,
            skqkrq,
            kckssj,
            kcjssj
        }).then((response) => {
            let {data} = response;
            instruction = data.instruction;
            instruction.hasInstruction = !!instruction.id;
            logger.debug("got instruction: ", instruction);

            if (cbOk) {
                cbOk();
            }
            if (cbFinish) {
                cbFinish();
            }

            dispatch({
                type: SET_INSTRUCTION,
                instruction: instruction
            });
        }).catch((error) => {
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