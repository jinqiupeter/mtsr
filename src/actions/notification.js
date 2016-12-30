import {NOTIFY_TIME} from '../config';

export const RESET_NOTIFICATION = 'reset_notification';
export const NOTIFY = 'notify';

export function resetNotification() {
    return {
        type: RESET_NOTIFICATION,
    };
}

function notifyAction(message) {
    return {
        type: NOTIFY,
        message,
    };
}

export function notify(message){
    return (dispatch) => {
        dispatch(notifyAction(message));
        setTimeout(()=>{
            dispatch(resetNotification());
        }, NOTIFY_TIME * 1000)
    }
}
