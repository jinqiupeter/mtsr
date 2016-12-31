import logger from '../logger';
import * as actions from '../actions';

const initialState = {
    userId: '',
    xpyFound: null,
};

export default (state = initialState, action) => {
    if (action.type == actions.LOGIN) {
        let {userId} = action;
        return {
            ...state,
            userId,
        };
    } else if (actions.type = actions.FIND_XPY) {
        let {xpyFound} = action;
        return {
            ...state,
            xpyFound,
        };
    } else if (action.type == actions.RESET || action.type == actions.RESET_ACCOUNT) {
        return initialState;
    } else {
        return state;
    }
}
