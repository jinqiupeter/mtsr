import logger from '../logger';
import * as actions from '../actions';

const initialState = {
    RegisterVerify: {
        secondsToSend: 0,
    },
    AssociateXpy: {
        genderPickerVisible: false,
    },

    EditProfile: {
        genderPickerVisible: false,
    },
    CreateReferral: {
        datePickerVisible: false,
        genderPickerVisible: false,
    },
    CreateAppointment: {
        datePickerVisible: false,
        genderPickerVisible: false,
    },
    SplashImage: {
        secondsToSkip: 0,
    }
};

export default (state = initialState, action) => {
    if (action.type == actions.SET_SCENE_STATE) {
        let {sceneKey, state: sceneState} = action;
        return {
            ...state,
            [sceneKey]: Object.assign({}, state[sceneKey], sceneState),
        };
    } else if (action.type == actions.RESET_SCENE_STATE) {
        let {sceneKey} = action;
        if (sceneKey === undefined) {
            return initialState;
        } else {
            return {
                ...initialState,
                [sceneKey]: initialState[sceneKey],
            };
        }
    } else if (action.type == actions.RESET) {
        return initialState;
    } else {
        return state;
    }
}
