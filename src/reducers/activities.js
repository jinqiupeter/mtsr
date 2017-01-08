/**
 * 在球场
 * zaiqiuchang.com
 */
import * as actions from '../actions';

const initialState = {
    activityIds: [],
    activityDescription: '',
};

export default (state = initialState, action) => {
    if (action.type == actions.SET_ACTIVITIES) {
        let {activityIds} = action;
        return {
            ...state,
            activityIds: activityIds,
        };
    } else if (action.type == actions.APPEND_ACTIVITIES) {
        let {activityIds} = action;
        return {
            ...state,
            activityIds: state.activityIds.concat(activityIds),
        };
    } else if (action.type == actions.SET_ACTIVITY_DESC) {
        let {activityDescription} = action;
        return {
            ...state,
            activityDescription,
        };
    } else if (action.type == actions.RESET || action.type == actions.RESET_ACTIVITIES) {
        return initialState;
    } else {
        return state;
    }
}
