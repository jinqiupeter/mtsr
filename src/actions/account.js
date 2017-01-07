import {Actions, ActionConst} from 'react-native-router-flux';
import ImageResizer from 'react-native-image-resizer';

import logger from '../logger';
import * as utils from '../utils';
import * as apis from '../apis';
import * as actions from './';

export const RESET_ACCOUNT = 'reset_account';
export const SET_ACCOUNT = 'set_account';
export const SET_PROFILE_IMAGE = "set_profile_image";
export const FIND_XPY = "find_xpy";

export function resetAccount() {
    return {
        type: RESET_ACCOUNT,
    };
}

export function registerMobileSubmit(sceneKey) {
    return (dispatch, getState) => {
        let {input} = getState();
        dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
            let {mobile, password} = input[sceneKey];
            let cbOk = () => Actions.RegisterVerify({mobile, password});
            apis.sendVerifyCode({mobile})
                .then(() => {
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
        }));
    };
}

export function registerVerifySubmit(sceneKey) {
    return (dispatch, getState) => {
        let {input} = getState();
        dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
            let {mobile, password, code} = input[sceneKey];
            logger.debug("verifying ", mobile, password, code);
            apis.register({mobile, password, code})
                .then(() => {
                    dispatch(actions.loginRequest(
                        {mobile, password}, () => Actions.AssociateXpy()
                    ));
                })
                .catch(error => {
                    if (error instanceof apis.ResultError) {
                        if (error.code == apis.ERROR_CODE_DUPLICATED) {
                            dispatch(actions.errorFlash("手机号已注册过。"));
                            return;
                        } else if (error.code == apis.ERROR_CODE_INVALID_VERIFY_CODE) {
                            dispatch(actions.errorFlash("验证码错误。"));
                            return;
                        }
                    }
                    dispatch(actions.handleApiError(error));
                });
        }));
    };
}

export function associateXpy(sceneKey) {
    return (dispatch, getState) => {
        dispatch(actions.setSceneState(sceneKey, {genderPickerVisible: false}));

        let {associate} = getState();
        let {xpybh, khbh} = associate;

        apis.editAccount({xpybh, khbh})
            .then((response) => {
                let {data: {account}} = response;
                dispatch({type: SET_ACCOUNT, account});
                Actions.Classes({type: 'reset'});
            })
            .catch((error) => dispatch(actions.handleApiError(error)));
    };
}

export function disassociateXpy() {
    return (dispatch) => {
        apis.editAccount({xpybh: "0", khbh: "0"})
            .then((response) => {
                let {data: {account}} = response;
                dispatch({type: SET_ACCOUNT, account});
            })
            .catch((error) => dispatch(actions.handleApiError(error)));
    };
}

export function loginSubmit(sceneKey, cbOk) {
    return (dispatch, getState) => {
        let {input} = getState();
        dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
            if (!cbOk) {
                cbOk = (account) => {
                    logger.debug("account before after login: ", account);
                    if (!!account.xpybh && !!account.khbh) {
                        Actions.Classes();
                    } else {
                        Actions.AssociateXpy();
                    }
                };
            }
            let {account, password} = input[sceneKey];
            let username, mobile, email;
            if (account.match(/^\d+$/) !== null) {
                mobile = account;
            } else if (account.match(/^.+@.+$/) !== null) {
                email = account;
            } else {
                username = account;
            }
            dispatch(loginRequest({username, mobile, email, password}, cbOk));
        }));
    }
}

export function loginRequest({username, mobile, email, password}, cbOk) {
    return (dispatch) => {
        apis.login({username, mobile, email, password})
            .then((response) => {
                let {data: {account}} = response;
                logger.debug("got account: ", account);
                dispatch(login({account, cbOk}));
            })
            .catch((error) => {
                if (error instanceof apis.ResultError) {
                    if (error.code == apis.ERROR_CODE_NOT_FOUND
                        || error.code == apis.ERROR_CODE_WRONG_PASSWORD) {
                        dispatch(actions.errorFlash("帐号或密码错误"));
                        return;
                    }
                }
                dispatch(actions.handleApiError(error));
            });
    };
}

export function login({account, cbOk, cbFail}) {
    return (dispatch) => {
        dispatch(actions.registerPush());

        dispatch({type: SET_ACCOUNT, account});
        if (cbOk) {
            cbOk(account);
        }
    };
}

export function logoutRequest() {
    return (dispatch) => {
        apis.logout()
            .then((response) => Actions.Bootstrap({isReset: true}))
            .catch((error) => dispatch(actions.handleApiError(error)));
    };
}

export function clearCache() {
    return (dispatch) => {
        dispatch(actions.reset());
        dispatch(actions.bootstrap());
    };
}

export function editProfileNicknameSubmit(sceneKey) {
    return (dispatch, getState) => {
        let {input, } = getState();
        let nickname = input[sceneKey];
        dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
            apis.editAccount(nickname)
                .then((response) => {
                    let {data: {account}} = response;
                    dispatch({type: SET_ACCOUNT, account});
                    Actions.pop();
                })
                .catch((error) => dispatch(actions.handleApiError(error)));
        }));
    }
}

export function selectCustomAvatar(sceneKey, picker) {
    return (dispatch) => {
        if (picker.error) {
            dispatch(actions.errorFlash(picker.error));
        } else if (!picker.didCancel && !picker.customButton) {
            dispatch(actions.saveInput(sceneKey, {profileimageurl: picker.uri}));
        }
    };
}

export function editProfileAvatarSubmit({picker}) {
    return (dispatch) => {
        logger.debug("picker in edit profile: ", picker);
        if (picker.didCancel || picker.customButton) {
            return;
        }

        let profileimageurl = picker.uri;
        let cbOk = (response) => {
            let {data: {account}} = response;
            dispatch({
                type: SET_ACCOUNT,
                account,
            });
        };

        if (utils.isUrl(profileimageurl)) {
            return;
        }

        ImageResizer.createResizedImage(profileimageurl, 1080, 810, 'JPEG', 90)
            .then(resizedImageUri => apis.uploadFile(resizedImageUri, 'image/jpeg'))
            .then((response) => {
                let {data: {file}} = response;
                logger.debug("change account profile: ", file);
                return apis.editAccount({profileimageurl: file.url});
            })
            .then(cbOk)
            .catch((error) => dispatch(actions.handleApiError(error)));

    };
}

export function searchXpy(sceneKey) {
    return (dispatch, getState) => {
        let {input} = getState();
        dispatch(actions.setSceneState(sceneKey, {genderPickerVisible: false}));
        logger.debug("input in searchXpy: ", input, sceneKey);
        dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
            let {realname, dateOfBirth, gender} = input[sceneKey];
            apis.searchXpy({realname, dateOfBirth, gender})
                .then((response) => {
                    let {data: {xpyFound}} = response;
                    dispatch({
                        type: FIND_XPY,
                        xpyFound,
                    });
                })
                .catch((error) => dispatch(actions.handleApiError(error)));
        }));
    };
}

export function changePassword(sceneKey, cbOk) {
    return (dispatch, getState) => {
        let {input} = getState();

        dispatch(actions.validateInput(sceneKey, input[sceneKey], () => {
            let {currentPassword, newPassword, newPasswordRepeat} = input[sceneKey];
            if (currentPassword == "") {
                dispatch(actions.errorFlash('请输入当前密码！'));
                return;
            }
            if (newPasswordRepeat != newPassword) {
                dispatch(actions.errorFlash('两次密码输入不匹配！'));
                return;
            }

            apis.changePassword({currentPassword, newPassword, newPasswordRepeat})
                .then(() => {
                    dispatch(actions.errorFlash('密码修改成功，请重新登录'));
                    setTimeout(() => Actions.Bootstrap({isReset: true}), 3000);
                })
                .catch((error) => dispatch(actions.handleApiError(error)));
        }));
    };
}
