/**
 * Created by peter on 16/12/2016.
 */

import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';
import * as helpers from '../components/helpers';

export const RESET_FAQ = 'reset_faq';
export const RESET_FEEDBACK = 'reset_feedback';
export const SET_FAQ = 'set_faq';
export const APPEND_FAQ = 'append_faq';
export const SET_FEEDBACK = 'set_feedback';
export const APPEND_FEEDBACK = 'append_feedback';

export function resetFaq() {
    return {
        type: RESET_FAQ,
    };
}

export function resetFeedback() {
    return {
        type: RESET_FEEDBACK,
    }
}

export function getFqa({offset = 0, limit = 10, cbOk, cbFail, cbFinish}) {
    return (dispatch, getState) => {
        let {object} = getState();
        let faqs = [];
        apis.getFaq({offset, limit})
            .then((response) => {
                let {data} = response;
                faqs = data.faq.filter((v) => {return !!v.id});
                logger.debug("got faqs: ", faqs);
                return actions.cacheFaqs(object, faqs);
            })
            .then((action) => {
                dispatch(action);

                let faqIds = faqs.map((v) => v.id);
                logger.debug("dispatching FAQIDS: ", faqIds);
                if (offset == 0) {
                    dispatch({type: SET_FAQ, faqIds});
                } else {
                    dispatch({type: APPEND_FAQ, faqIds});
                }

                if (cbOk) {
                    cbOk();
                }
                if (cbFinish) {
                    cbFinish();
                }
            })
            .catch((error) => {
                dispatch(actions.handleApiError(error));
                if (cbFail) {
                    cbFail();
                }
                if (cbFinish) {
                    cbFinish();
                }
            });
    };
}

export function getFeedback({xpybh, offset = 0, limit = 10, cbOk, cbFail, cbFinish}) {
    return (dispatch, getState) => {
        let {object} = getState();
        let feedbacks = [];
        apis.getFeedback({xpybh, offset, limit})
            .then((response) => {
                let {data} = response;
                feedbacks = data.feedback.filter((v) => {return !!v.id});
                logger.debug("got feedbacks: ", feedbacks);
                return actions.cacheFeedbacks(object, feedbacks);
            })
            .then((action) => {
                dispatch(action);

                let feedbackIds = feedbacks.map((v) => v.id);
                logger.debug("dispatching FeedbackIds: ", feedbackIds);
                if (offset == 0) {
                    dispatch({type: SET_FEEDBACK, feedbackIds});
                } else {
                    dispatch({type: APPEND_FEEDBACK, feedbackIds});
                }

                if (cbOk) {
                    cbOk();
                }
                if (cbFinish) {
                    cbFinish();
                }
            })
            .catch((error) => {
                dispatch(actions.handleApiError(error));
                if (cbFail) {
                    cbFail();
                }
                if (cbFinish) {
                    cbFinish();
                }
            });
    };
}