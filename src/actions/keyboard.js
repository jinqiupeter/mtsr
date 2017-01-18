export const RESET_KEYBOARD = 'reset_keyboard';
export const SET_KEYBOARD = 'set_keyboard';

export function resetKeyboard() {
  return {
    type: RESET_KEYBOARD,
  };
}

export function setKeyboard({coords}) {
  return {
    type: SET_KEYBOARD,
    coords,
  };
}