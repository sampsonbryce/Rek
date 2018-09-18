import USER_LOGIN from './actions';
import { combineReducers } from 'redux';


function userReducer(state = null, action){
    switch(action.type){
        case USER_LOGIN:
            return {...state, user: action.user }
        default:
            return state;
    }
}

const mainReducer = combineReducers({
    user: userReducer,
})

export default mainReducer;
