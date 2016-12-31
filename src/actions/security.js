import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';

export function sendVerifyCode({mobile, cbOk}) {
    return (dispatch) => {
        logger.debug("sending sms code to ", mobile);
        apis.sendVerifyCode({mobile})
            .then((response) => {
                logger.debug("sms code sent to ", mobile);
                if (cbOk) {
                    cbOk();
                }
            })
            .catch(error => {
                if (error instanceof apis.ResultError) {
                    if (error.code == apis.ERROR_CODE_SMS_CODE_FAILED) {
                        dispatch(actions.errorFlash("发送验证码失败，请稍后重试。"));
                        return;
                    }
                }
                dispatch(actions.handleApiError(error))
            });
    }
}