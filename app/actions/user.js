import * as userActionTypes from '../constants/user';
/* eslint-disable */
export function login(data) {
  return {
    type: userActionTypes.USER_LOGIN,
    data
  }
};

