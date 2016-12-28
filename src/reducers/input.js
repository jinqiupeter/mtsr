import * as actions from '../actions';
import logger from '../logger';

const initialState = {
    Login: {
        account: '',
        password: '',
        validity: false,
    },
    RegisterMobile: {
        mobile: '',
        password: '',
        validity: false,
    },
    RegisterVerify: {
        code: '',
        validity: false,
    },
    RegisterProfile: {
        gender: '',
        validity: false,
    },

    EditProfile: {
        gender: '',
        validity: false,
    },
    EditProfileNickname: {
        nickname: '',
        validity: false,
    },
    EditProfileAvatar: {
        profileImageUrl: '',
        validity: false,
    },
    Classes: {
        selectedClassType: 0,
        startDate: new Date(),
        validity: false,
    },
    Schedule: {
        selectedScheduleType: 0,
        startDate: new Date(),
        validity: false,
    },
    CreateFeedback: {
        feedback: '',
        validity: false,
    },
    CreateReferral: {
        xm: '',
        gender: '',
        csrq: '',
        mqxm: '',
        mqdh: '',
        fqxm: '',
        fqdh: '',
        validity: false,
    },
    CreateAppointment: {
        name: '',
        gender: '',
        dateOfBirth: '',
        motherName: '',
        motherPhone: '',
        fatherName: '',
        fatherPhone: '',
        validity: false,
    }
};

export default (state = initialState, action) => {
    if (action.type == actions.INPUT) {
        let {scene, input} = action;
        return {
            ...state,
            [scene]: Object.assign({}, state[scene], input),
        };
    } else if (action.type == actions.RESET_INPUT) {
        let {scene} = action;
        if (scene === undefined) {
            return initialState;
        } else {
            return {
                ...initialState,
                [scene]: initialState[scene],
            };
        }
    } else if (action.type == actions.CHANGE_VALIDITY) {
        let {scene, validity} = action;

        return  {
            ...state,
            [scene]: Object.assign({}, state[scene], {validity}),
        };
    } else if (action.type == actions.RESET) {
        return initialState;
    } else {
        return state;
    }
}
