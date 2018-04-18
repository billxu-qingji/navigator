import * as  userActionTypes from '../constants/user';
const initialState = {};

export default function user(state = initialState, action){
    switch(action.type){
        //登录
        case userActionTypes.USER_LOGIN:
            return action.data;
        default:
            return state;
    }
}