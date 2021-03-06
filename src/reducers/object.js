import logger from '../logger';
import * as actions from '../actions';

const initialState = {
    account: {},
    attendedClasses: {},
    unattendedClasses: {},
    activities: {},
    files: {},
    userStats: {},
    selectableClasses: [],
    faqs: [],
    feedbacks: [],
    referrals: [],
    sponsors: [],
    appointments: [],
};

export default (state = initialState, action) => {
    if (action.type == actions.CACHE_OBJECTS) {
        let newState = Object.assign({}, state);
        for (let [k, v] of Object.entries(action)) {
            if (newState[k] === undefined) {
                continue;
            }
            newState[k] = Object.assign({}, newState[k], v);
        }
        return newState;
    } else if (action.type == actions.RESET || action.type == actions.RESET_OBJECT_CACHE) {
        return initialState;
    } else {
        return state;
    }
}
