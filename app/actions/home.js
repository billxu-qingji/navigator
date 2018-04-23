import * as homeActionTypes from '../constants/home';

export function getSites(data) {
  return {
    type: homeActionTypes.GET_SITES,
    data,
  }
}
export function getRecord(data) {
  return {
    type: homeActionTypes.GET_RECORD,
    data,
  }
}