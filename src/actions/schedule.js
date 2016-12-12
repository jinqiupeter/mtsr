
import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';

import parse from 'date-fns/parse';
import isAfter from 'date-fns/is_after';
import eachDay from 'date-fns/each_day'
import isSameDay from 'date-fns/is_same_day';
import isBefore from 'date-fns/is_before';

import * as helpers from '../components/helpers';

export const RESET_SELECTABLE = 'reset_selectable';
export const SET_SELECTABLE = 'set_selectable';
export const APPEND_SELECTABLE = 'append_selectable';

export const CHANGE_SELECT_DAY = "change_select_day";

export function resetSelectable() {
    return {
        type: RESET_SELECTABLE,
    };
}

export function selectableClasses({xpybh, offset = 0, cbOk, cbFail, cbFinish}) {
    return (dispatch, getState) => {
        let {object} = getState();
        let selectables;
        apis.selectableClasses({
            xpybh,
            offset,
        }).then((response) => {
            let {data} = response;
            selectables = data.selectableClasses.filter((v) => {return !!v.id});
            logger.debug("got selectableClasses: ", selectables);
            return actions.cacheAttendedClasses(object, selectables);
        })
            .then((action) => {
                dispatch(action);
                let selectableIds = selectables.map((v) => v.id);
                if (offset == 0) {
                    dispatch({type: SET_SELECTABLE, selectableIds});
                } else {
                    dispatch({type: APPEND_SELECTABLE, selectableIds});
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