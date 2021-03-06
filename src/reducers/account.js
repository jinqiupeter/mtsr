import logger from '../logger';
import * as actions from '../actions';

const initialState = {
};

export default (state = initialState, action) => {
    if (action.type == actions.SET_ACCOUNT) {
        let {account} = action;
        return account;
    } else if (action.type == actions.RESET
        || action.type == actions.RESET_ACCOUNT) {
        return initialState;
    } else {
        return state;
    }
}
