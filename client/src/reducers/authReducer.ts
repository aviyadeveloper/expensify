import { AuthReducerState, AuthReducerAction } from '../types/authTypes';

export default (state: AuthReducerState = { uid: undefined }, action: any) => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, uid: action.uid };
    case 'LOG_OUT':
      return { ...state, uid: undefined };
    default:
      return state;
  }
};
