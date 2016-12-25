/**
 * Created by peter on 16/12/2016.
 */

import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';
import * as helpers from '../components/helpers';

export const RESET_FAQ = 'reset_faq';
export const RESET_FEEDBACK = 'reset_feedback';
export const RESET_REFERRAL = "reset_referral";
export const RESET_SPONSOR = "reset_sponsor";
export const SET_FAQ = 'set_faq';
export const APPEND_FAQ = 'append_faq';
export const SET_FEEDBACK = 'set_feedback';
export const APPEND_FEEDBACK = 'append_feedback';
export const SET_REFERRAL = "set_referral";
export const APPEND_REFERRAL = "append_referral";
export const SET_SPONSOR = "set_sponsor";
export const APPEND_SPONSOR = "append_sponsor";

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
export function resetReferral() {
    return {
        type: RESET_REFERRAL,
    }
}
export function resetSponsor() {
    return {
        type: RESET_SPONSOR,
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

export function createFeedback(sceneKey, cbOk, cbFail, cbFinish) {
    return (dispatch, getState) => {
        let {input} = getState();

        dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
            let {xpybh, feedback} = input[sceneKey];
            apis.createFeedback({xpybh, feedback})
                .then(() => {
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
        }));

    };
}

export function getReferral({xpybh, offset = 0, limit = 10, cbOk, cbFail, cbFinish}) {
    return (dispatch, getState) => {
        let {object} = getState();
        let referrals = [];
        apis.getReferral({xpybh, offset, limit})
            .then((response) => {
                let {data} = response;
                referrals = data.referral.filter((v) => {return !!v.id});
                logger.debug("got referrals: ", referrals);
                return actions.cacheReferrals(object, referrals);
            })
            .then((action) => {
                dispatch(action);

                let referralIds = referrals.map((v) => v.id);
                logger.debug("dispatching referralIds: ", referralIds);
                if (offset == 0) {
                    dispatch({type: SET_REFERRAL, referralIds});
                } else {
                    dispatch({type: APPEND_REFERRAL, referralIds});
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

export function createReferral(sceneKey, cbOk, cbFail, cbFinish) {
    return (dispatch, getState) => {
        let {input} = getState();

        dispatch(actions.setSceneState(sceneKey, {
            genderPickerVisible: false,
            datePickerVisible: false,
        }));

        dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
            let {xpybh, xm, csrq, gender, mqxm, mqdh, fqxm, fqdh} = input[sceneKey];
            apis.createReferral({xpybh, xm, csrq, gender, mqxm, mqdh, fqxm, fqdh})
                .then(() => {
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
        }));

    };
}

export function getSponsor({offset = 0, limit = 10, cbOk, cbFail, cbFinish}) {
    return (dispatch, getState) => {
        let {object} = getState();
        let sponsors = [];
        apis.getSponsor({offset, limit})
            .then((response) => {
                let {data} = response;
                sponsors = data.sponsor.filter((v) => {return !!v.id});
                logger.debug("got sponsors: ", sponsors);
                return actions.cacheSponsors(object, sponsors);
            })
            .then((action) => {
                dispatch(action);

                let sponsorIds = sponsors.map((v) => v.id);
                logger.debug("dispatching sponsorIds: ", sponsorIds);
                if (offset == 0) {
                    dispatch({type: SET_SPONSOR, sponsorIds});
                } else {
                    dispatch({type: APPEND_SPONSOR, sponsorIds});
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