import {Actions} from 'react-native-router-flux';

import logger from '../logger';
import * as utils from '../utils';
import * as apis from '../apis';
import * as actions from './';

export const RESET_ACTIVITIES = 'reset_user';
export const SET_ACTIVITIES = 'set_activities';
export const APPEND_ACTIVITIES = 'append_activities';
export const SET_ACTIVITY_DESC = 'set_activity_desc';

export function resetActivities() {
    return {
        type: RESET_ACTIVITIES,
    };
}

export function getActivities({offset = 0, cbOk, cbFail, cbFinish}) {
    return (dispatch, getState) => {
        let {object} = getState();

        let activities = [];
        apis.getActivities({offset})
            .then((response) => {
                let {data} = response;
                activities = data.activities.filter((v) => {return !!v.id});
                return actions.cacheActivities(object, activities);
            })
            .then((action) => {
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

export function updateAttendStatus({activityId, targetStatus, cbFinish}) {
    return (dispatch) => {
        apis.updateAttendStatus({activityId, targetStatus})
            .then(() => {
                dispatch(getActivities({}));
            })
            .catch((error) => {
                dispatch(actions.handleApiError(error));

                if (cbFinish) {
                    cbFinish();
                }
            });
    };
}

export function getActivityDescription({activityId, cbFail, cbFinish}) {
    return (dispatch) => {
        apis.activityDescription({activityId})
            .then((response) => {
                let {data} = response;
                let activityInfo = data.activityInfo;

                dispatch({type: SET_ACTIVITY_DESC,
                    activityDescription: activityInfo.description});
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


