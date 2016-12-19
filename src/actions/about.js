/**
 * Created by peter on 16/12/2016.
 */

import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';
import * as helpers from '../components/helpers';

export const RESET_FAQ = 'reset_faq';
export const SET_FAQ = 'set_faq';

export function resetFaq() {
    return {
        type: RESET_FAQ,
    };
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
                dispatch({type: SET_FAQ, faqIds});

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