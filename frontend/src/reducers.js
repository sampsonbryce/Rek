import { USER_LOGIN } from './constants';
import { combineReducers } from 'redux';

function user(state = {}, action){
    switch(action.type){
        case USER_LOGIN:
            return action.user;
        default:
            return state;
    }
}

function token(state = "", action){
    switch(action.type){
        case USER_LOGIN:
            return action.token;
        default:
            return state;
    }
}

const mainReducer = combineReducers({
    user,
    token,
})

export default mainReducer;
