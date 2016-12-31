import {Actions} from 'react-native-router-flux';

import logger from '../logger';
import * as utils from '../utils';
import * as apis from '../apis';
import * as actions from './';

export const RESET_INPUT = 'reset_input';
export const INPUT = 'input';
export const CHANGE_VALIDITY = "change_validity";

export function resetInput(scene) {
    return {
        type: RESET_INPUT,
        scene,
    };
}

export function saveInput(scene, input, cbOK) {
    return dispatch => {
        dispatch({
            type: INPUT,
            scene,
            input,
        });
        dispatch(validateInput(scene, input, cbOK));
    };
}

export function cancelInput(scene) {
    return dispatch => {
        dispatch(resetInput(scene));
        Actions.pop();
    };
}

export function validateInput(scene, input, cbOk) {
    return dispatch => {
        let error = {};
        Object.entries(input).forEach(([k, v]) => {
            if (constraints[scene] && constraints[scene][k]) {
                error[k] = utils.validateSingle(v, constraints[scene][k]);
            } else {
                error[k] = [];
            }
        });
        dispatch(actions.errorInput(scene, error));

        if (Object.values(error).every(v => v.length == 0)) {
            dispatch({
                type: CHANGE_VALIDITY,
                scene,
                validity: true,
            });

            if (cbOk !== undefined) {
                cbOk();
            }
        } else {
            dispatch({
                type: CHANGE_VALIDITY,
                scene,
                validity: false,
            });
        }
    };
}

let accountConstraints = {
    presence: {
        message: '请输入帐号。',
    },
};

let mobileConstraints = {
    presence: {
        message: '请输入手机号。',
    },
    format: {
        pattern: /^\d{11}$/,
        message: '手机号须为11位数字。'
    },
};

let passwordConstraints = {
    presence: {
        message: '请输入密码。',
    },
    length: {
        minimum: 6,
        maximum: 20,
        message: '密码长度须在6到20之间。'
    },
};

let newPasswordConstraints = {
    presence: {
        message: '请输入新密码。',
    },
    length: {
        minimum: 6,
        maximum: 20,
        message: '密码长度须在6到20之间。'
    },
};

let newPasswordRepeatConstraints = {
    presence: {
        message: '请再次输入新密码。',
    },
    length: {
        minimum: 6,
        maximum: 20,
        message: '密码长度须在6到20之间。'
    },
};

let verifyCodeConstraints = {
    presence: {
        message: '请输入验证码。',
    },
    format: {
        pattern: /^\d{6}$/,
        message: '验证码为6位数字。'
    },
};

let nameConstraints =  {
    presence: {
        message: '姓名不能为空',
    },
    length: {
        minimum: 2,
            maximum: 5,
            message: '姓名必须是2到5个字符'
    }
};

let constraints = {
    Login: {
        account: accountConstraints,
        password: passwordConstraints,
    },

    RegisterMobile: {
        mobile: mobileConstraints,
        password: passwordConstraints,
    },
    RegisterVerify: {
        code: verifyCodeConstraints,
    },

    EditProfileNickname: {
        nickname: {
            presence: {
                message: '请输入昵称。',
            },
            length: {
                minimum: 2,
                maximum: 6,
                message: '昵称长度须在2到6个字符之间。'
            },
        },
    },
    CreateFeedback: {
        feedback: {
            presence: {
                message: '留言不能为空',
            },
            length: {
                minimum: 10,
                maximum: 500,
                message: '留言长度须在10到500个字符之间。'
            },
        }
    },
    EditProfilePassword: {
        currentPassword: passwordConstraints,
        newPassword: newPasswordConstraints,
        newPasswordRepeat: newPasswordRepeatConstraints,
    },
    CreateReferral: {
        xm: nameConstraints,
        mqxm: nameConstraints,
        fqxm: nameConstraints,
        mqdh: mobileConstraints,
        fqdh: mobileConstraints,
    },
    CreateAppointment: {
        name: nameConstraints,
        motherName: nameConstraints,
        fatherName: nameConstraints,
        motherPhone: mobileConstraints,
        fatherPhone: mobileConstraints,
    },
    AssociateXpy: {
        realname: nameConstraints,
    }
};
