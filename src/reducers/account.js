/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  userId: '',
};

export default (state = initialState, action) => {
  if (action.type == actions.LOGIN) {
    let {userId} = action;
    return {
      ...state,
      userId,
    };
  } else if (action.type == actions.RESET || action.type == actions.RESET_ACCOUNT) {
    return initialState;
  } else {
    return state;
  }
}
