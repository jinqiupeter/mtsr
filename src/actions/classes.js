import {Actions} from 'react-native-router-flux';
import ImageResizer from 'react-native-image-resizer';

import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';

import parse from 'date-fns/parse';
import isAfter from 'date-fns/is_after';
import eachDay from 'date-fns/each_day'
import isSameDay from 'date-fns/is_same_day';
import addDays from 'date-fns/add_days';

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

function expand(packed, classLeft) {
    let classFound = 0;
    let cursorDate = new Date();
    let days = [];

    let endDate = packed.reduce((lastDate, aPacked) => {
        let classEnddate = parse(aPacked.enddate);
        if (isAfter(classEnddate, lastDate)) {
            lastDate = classEnddate;
        }

        return lastDate;
    }, cursorDate);


    while (classFound < classLeft && isAfter(endDate, cursorDate)) {
        packed.forEach(aPacked => {
            if ( (aPacked.type == 1 && aPacked.kcxq == cursorDate.getDay())
            || (aPacked.type == 2 && isSameDay(cursorDate, aPacked.date))) {
                let classes = cursorDate.classes || [];

                classes.push({...aPacked});
                classFound++;

                cursorDate.classes = classes;
            }
        });

        if (!!cursorDate.classes) {
            days.push({hasClass: true, date: parse(cursorDate), classes: cursorDate.classes})
        }
        cursorDate = addDays(cursorDate, 1);
    }

    logger.debug("days found: ", days);

    return days.map((v, index) => {
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
        let {object, account} = getState();
        let unattendedClasses;
        apis.unattendedClasses({
            xpybh,
            offset,
        }).then((response) => {
            let {data} = response;
            let classes = data.unattendedClasses.filter((v) => {return !!v.id});
            logger.debug("got UnattendedClasses: ", classes);
            unattendedClasses = expand(classes, account.classleft);
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