
import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';

import eachDay from 'date-fns/each_day'
import addMonths from 'date-fns/add_months';
import addDays from 'date-fns/add_days';

export const RESET_SELECTABLE = 'reset_selectable';
export const SET_SELECTABLE = 'set_selectable';

export const CHANGE_SELECT_DAY = "change_select_day";

export function resetSelectable() {
    return {
        type: RESET_SELECTABLE,
    };
}

function expandSelectableClasses(packedSelectableClasses, monthAge) {
    let expanded = packedSelectableClasses.reduce((accumulated, packedSelectableClass) => {
        if (packedSelectableClass.kcjsyl > accumulated.endMonthAge) {
            // extend end month age
            let endDate = addMonths(accumulated.endDate, packedSelectableClass.kcjsyl - accumulated.endMonthAge);
            let newDays = eachDay(accumulated.endDate, endDate).map((v) => {
                return {hasClass: false, date: v, classes: []};
            });

            accumulated.days = accumulated.days.concat(newDays);
            accumulated.endDate = endDate;
            accumulated.endMonthAge = packedSelectableClass.kcjsyl;
        }

        accumulated.days = accumulated.days.map((v) => {
            if (v.date.getDay() == packedSelectableClass.kcxq) {
                let classes = v.classes || [];
                classes.push({...packedSelectableClass});
                return {hasClass: true, date: v.date, classes: classes}
            } else {
                return v;
            }
        });

        return accumulated;
    }, {days: [], endDate: addDays(new Date(), 1) , endMonthAge: monthAge});

    expanded.days.filter((v) => {
        return v.hasClass == true;
    });

    return expanded.days.map((v, index) => {
        return {...v, id:index};
    });
}
export function selectableClasses({xpybh, offset = 0, cbOk, cbFail, cbFinish}) {
    return (dispatch, getState) => {
        let {object, account} = getState();
        let selectableDays;
        apis.selectableClasses({
            xpybh,
            offset,
        }).then((response) => {
            let {data} = response;
            let classes = data.selectableClasses.filter((v) => {return !!v.id});
            logger.debug("got unexpanded selectableClasses: ", classes, object, object.users[account.userId].monthage);
            let monthAge = object.users[account.userId].monthage;
            selectableDays = expandSelectableClasses(classes, monthAge);
            logger.debug("got selectableClasses: ", selectableDays);

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