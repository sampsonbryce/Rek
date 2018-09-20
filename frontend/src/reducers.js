import { USER_LOGIN } from './constants';
import { combineReducers } from 'redux';

const initial_state = {
    user:{
        name: 'bob'
    },
    token:"none",
}


function user(state = {name: 'bob'}, action){
    console.log('in user reducer:', action);
    console.log('action.type:', action.type);
    console.log('user login:', USER_LOGIN);
    switch(action.type){
        case USER_LOGIN:
            console.log("USER LOGIN", state);
            // let newState = {...state, user: action.user, token: action.token }
            let newState = action.user
            console.log("new State", newState);
            return newState;
        default:
        console.log("returning init state", initial_state);
            return state;
    }
}

function token(state="", action){
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
