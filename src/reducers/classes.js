/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
    attendedClasses: [],
    unattendedClasses: [],
};

export default (state = initialState, action) => {
    if (action.type == actions.SET_CLASSES) {
        let {classIds} = action;
        return {
            ...state,
            attendedClasses: classIds,
        };
    } else if (action.type == actions.APPEND_CLASSES) {
        let {classIds} = action;
        return {
            ...state,
            attendedClasses: (state.attendedClasses || []).concat(classIds),
        };
    } else if (action.type == actions.RESET || action.type == actions.RESET_CLASS) {
        return initialState;
    } else {
        return state;
    }
}
