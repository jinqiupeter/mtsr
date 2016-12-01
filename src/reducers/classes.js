
import * as actions from '../actions';

const initialState = {
    attendedClasses: [],
    unattendedClasses: [],
};

export default (state = initialState, action) => {
    if (action.type == actions.SET_ATTENDED_CLASSES) {
        let {classIds} = action;
        return {
            ...state,
            attendedClasses: classIds,
        };
    } else if (action.type == actions.APPEND_ATTENDED_CLASSES) {
        let {classIds} = action;
        return {
            ...state,
            attendedClasses: (state.attendedClasses || []).concat(classIds),
        };
    } if (action.type == actions.SET_UNATTENDED_CLASSES) {
        let {classIds} = action;
        return {
            ...state,
            unattendedClasses: classIds,
        };
    } else if (action.type == actions.APPEND_UNATTENDED_CLASSES) {
        let {classIds} = action;
        return {
            ...state,
            unattendedClasses: (state.unattendedClasses || []).concat(classIds),
        };
    } else if (action.type == actions.RESET || action.type == actions.RESET_CLASS) {
        return initialState;
    } else {
        return state;
    }
}
