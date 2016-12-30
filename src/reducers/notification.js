import * as actions from '../actions';

const initialState = {
    message: '',
};

export default (state = initialState, action) => {
    if (action.type == actions.NOTIFY) {
        let {message} = action;
        return {
            ...state,
            message,
        };
    } else if (action.type == actions.RESET
        || action.type == actions.RESET_NOTIFICATION) {
        return initialState;
    } else {
        return state;
    }
}
