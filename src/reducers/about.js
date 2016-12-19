/**
 * Created by peter on 16/12/2016.
 */
import * as actions from '../actions';

const initialState = {
    faqIds: [],
};

export default (state = initialState, action) => {
    if (action.type == actions.SET_FAQ) {
        let {faqIds} = action;
        return {
            ...state,
            faqIds,
        };
    } else if (action.type == actions.RESET || action.type == actions.RESET_FAQ) {
        return initialState;
    } else {
        return state;
    }
}