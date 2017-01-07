
import * as actions from '../actions';

const initialState = {
    selectableDays: [],
    packedSelectableClasses: [],
    classDescription: '',
};

export default (state = initialState, action) => {
    if (action.type == actions.SET_SELECTABLE) {
        let {selectableDays} = action;
        return {
            ...state,
            selectableDays: selectableDays,
        };
    } else if (action.type == actions.SET_PACKED_SELECTABLE) {
        let {packedSelectableClasses} = action;
        return {
            ...state,
            packedSelectableClasses,
        };
    } else if (action.type == actions.CHANGE_MONTH) {
        let {selectableDays} = action;
        return {
            ...state,
            selectableDays: selectableDays,
        };
    } else if (action.type == actions.SET_CLASS_DESC) {
        let {classDescription} = action;
        return {
            ...state,
            classDescription,
        };
    } else if (action.type == actions.RESET || action.type == actions.RESET_SELECTABLE) {
        return initialState;
    } else {
        return state;
    }
}
