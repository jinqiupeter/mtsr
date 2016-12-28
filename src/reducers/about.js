/**
 * Created by peter on 16/12/2016.
 */
import * as actions from '../actions';

const initialState = {
    faqIds: [],
    feedbackIds: [],
    referralIds: [],
    sponsorIds: [],
    appointmentIds: [],
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
            feedbackIds: state.feedbackIds.concat(feedbackIds),
        }
    } else if (action.type == actions.SET_REFERRAL) {
        let {referralIds} = action;
        return {
            ...state,
            referralIds,
        };
    } else if (action.type == actions.APPEND_REFERRAL) {
        let {referralIds} = action;
        return {
            ...state,
            referralIds: state.referralIds.concat(referralIds),
        }
    } else if (action.type == actions.SET_SPONSOR) {
        let {sponsorIds} = action;
        return {
            ...state,
            sponsorIds,
        };
    } else if (action.type == actions.APPEND_SPONSOR) {
        let {sponsorIds} = action;
        return {
            ...state,
            sponsorIds: state.sponsorIds.concat(sponsorIds),
        }
    } else if (action.type == actions.SET_APPOINTMENT) {
        let {appointmentIds} = action;
        return {
            ...state,
            appointmentIds,
        };
    } else if (action.type == actions.APPEND_APPOINTMENT) {
        let {appointmentIds} = action;
        return {
            ...state,
            appointmentIds: state.appointmentIds.concat(appointmentIds),
        }
    }else if (action.type == actions.RESET
        || action.type == actions.RESET_FAQ
        || action.type == actions.RESET_FEEDBACK
        || action.type == actions.RESET_REFERRAL
        || action.type == actions.RESET_SPONSOR
        || action.type == actions.RESET_APPOINTMENT
    ) {
        return initialState;
    } else {
        return state;
    }
}