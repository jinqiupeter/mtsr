/**
 * Created by peter on 16/12/2016.
 */
import * as actions from '../actions';

const initialState = {
    faqIds: [],
    feedbackIds: [],
};

export default (state = initialState, action) => {
    if (action.type == actions.SET_FAQ) {
        let {faqIds} = action;
        return {
            ...state,
            faqIds,
        };
    } else if (action.type == actions.APPEND_FAQ) {
        let {faqIds} = action;
        return {
            ...state,
            faqIds: state.faqIds.concat(faqIds),
        }
    } else if (action.type == actions.SET_FEEDBACK) {
        let {feedbackIds} = action;
        return {
            ...state,
            feedbackIds,
        };
    } else if (action.type == actions.APPEND_FEEDBACK) {
        let {feedbackIds} = action;
        return {
            ...state,
            faqIds: state.faqIds.concat(feedbackIds),
        }
    } else if (action.type == actions.RESET
        || action.type == actions.RESET_FAQ
        || action.type == actions.RESET_FEEDBACK) {
        return initialState;
    } else {
        return state;
    }
}