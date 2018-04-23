import * as homeActionTypes from '../constants/home';
const initialState = {};

export default function home(state = initialState, action) {
  switch (action.type) {
    case homeActionTypes.GET_SITES:
      return {
        ...state,
        sites: action.data,
      }
    case homeActionTypes.GET_RECORD:
      return {
        ...state,
        attendRecord: action.data,
      }
    default:
      return state;
  }
}