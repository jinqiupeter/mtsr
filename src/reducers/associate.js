import logger from '../logger';
import * as actions from '../actions';

const initialState = {
};

export default (state = initialState, action) => {
    if (action.type == actions.FIND_XPY) {
        let {xpyFound} = action;
        return xpyFound;
    } else if (action.type == actions.RESET) {
        return initialState;
    } else {
        return state;
    }
}
