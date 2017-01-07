
import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';
import * as helpers from '../components/helpers';

import eachDay from 'date-fns/each_day'
import addMonths from 'date-fns/add_months';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import differenceInCalendarMonths from 'date-fns/difference_in_calendar_months';
import isThisMonth from 'date-fns/is_this_month';
import isBefore from 'date-fns/is_before';

export const RESET_SELECTABLE = 'reset_selectable';
export const SET_SELECTABLE = 'set_selectable';
export const SET_PACKED_SELECTABLE = "set_packed_selectable";
export const CHANGE_MONTH = "change_month";
export const SET_CLASS_DESC = 'set_class_desc';

export function resetSelectable() {
    return {
        type: RESET_SELECTABLE,
    };
}

function expandSelectableClasses(packedSelectableClasses, xpyMonthAge, startingDate = new Date()) {
    logger.debug("expanding selectables since ", startingDate);
    let today = new Date();
    let start = startOfMonth(startingDate);
    if (isThisMonth(startingDate)) {
        start = today;
    } else if (isBefore(startingDate, startOfMonth(today))) {
        return [];
    }

    let end = endOfMonth(startingDate, today);
    let days = eachDay(start, end).map((v) => {
        return {hasClass: false, date: v, classes: []};
    });
    logger.debug("days ", days);

    let minDiff = differenceInCalendarMonths(startingDate, new Date);
    let expanded = packedSelectableClasses.reduce((accumulated, packedSelectableClass) => {
        let actualDiff = packedSelectableClass.kcjsyl - xpyMonthAge;
        if (actualDiff < minDiff) {
            return accumulated;
        }

        accumulated = accumulated.map((v) => {
            if (v.date.getDay() == packedSelectableClass.kcxq) {
                let classes = v.classes || [];
                classes.push({...packedSelectableClass});
                return {hasClass: true, date: v.date, classes: classes}
            } else {
                return v;
            }
        });

        return accumulated;
    }, days);

    expanded = expanded.filter((v) => {
        return v.hasClass == true;
    });

    return expanded.map((v, index) => {
        return {...v, id:index};
    });
}

export function selectableClasses({startingDate, cbOk, cbFail, cbFinish}) {
    return (dispatch, getState) => {
        let {object, account} = getState();
        apis.selectableClasses({})
            .then((response) => {
                let {data} = response;
                let packedSelectableClasses = data.selectableClasses.filter((v) => {return !!v.id});
                logger.debug("got packedSelectableClasses: ", packedSelectableClasses);

                dispatch({type: SET_PACKED_SELECTABLE, packedSelectableClasses});

                let monthAge = account.monthage;
                let selectableDays = expandSelectableClasses(packedSelectableClasses, monthAge, startingDate);
                dispatch({type: SET_SELECTABLE, selectableDays});

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

export function changeMonth({startingDate}) {
    return (dispatch, getState) => {
        let {object, account} = getState();

        let packedSelectableClasses = Object.values(helpers.packedSelectablesFromCache(object));
        let monthAge = account.monthage;
        let selectableDays = expandSelectableClasses(packedSelectableClasses, monthAge, startingDate);

        logger.debug("changing CHANGE_MONTH: ", selectableDays);
        dispatch({type: CHANGE_MONTH, selectableDays});
    }
}

export function getClassDescription({kcbxxbh, cbFinish}) {
    return (dispatch) => {
        apis.classDescription({kcbxxbh})
            .then((response) => {
                let {data} = response;
                let classInfo = data.classInfo;
                logger.debug("got classInfo: ", classInfo);

                dispatch({type: SET_CLASS_DESC,
                    classDescription: classInfo.classdescription});
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

export function selectRegular({kcbxxbh, cbFinish}) {
    return (dispatch) => {
        apis.selectRegular({kcbxxbh})
            .then(() => {
                dispatch(selectableClasses({startingDate: new Date()}));
            })
            .catch((error) => {
                dispatch(actions.handleApiError(error));

                if (cbFinish) {
                    cbFinish();
                }
            });
    };
}

export function deselectRegular({xkxxbh, cbFinish}) {
    return (dispatch) => {
        apis.deselectRegular({xkxxbh})
            .then(() => {
                dispatch(actions.unattendedClasses({}));
            })
            .catch((error) => {
                dispatch(actions.handleApiError(error));
                if (cbFinish) {
                    cbFinish();
                }
            });
    };
}
