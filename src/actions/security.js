import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';

export function sendVerifyCode({mobile, cbOk}) {
    return (dispatch) => {
        apis.sendVerifyCode({mobile})
            .then((response) => {
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