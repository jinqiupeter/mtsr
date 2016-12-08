/**
 * 在球场
 * zaiqiuchang.com
 */

import {Actions} from 'react-native-router-flux';

import logger from '../logger';
import * as utils from '../utils';
import * as apis from '../apis';
import * as actions from './';

export const RESET_ACTIVITIES = 'reset_user';
export const SET_ACTIVITIES = 'set_activities';
export const APPEND_ACTIVITIES = 'append_activities';

export function resetActivities() {
    return {
        type: RESET_ACTIVITIES,
    };
}

export function getActivities({offset = 0, cbOk, cbFail, cbFinish}) {
    return (dispatch, getState) => {
        let {object} = getState();

        let activities;
        apis.getActivities({offset})
            .then((response) => {
                let {data} = response;
                activities = data.activities.filter((v) => {return !!v.id});
                return actions.cacheActivities(object, activities);
            })
            .then((action) => {
                logger.debug("activities cached: ", action);
                dispatch(action);
                let activityIds = activities.map((v) => v.id);
                if (offset == 0) {
                    dispatch({type: SET_ACTIVITIES, activityIds});
                } else {
                    dispatch({type: APPEND_ACTIVITIES, activityIds});
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
