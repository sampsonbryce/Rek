import { combineReducers } from 'redux';
import { USER_LOGIN, SET_SELECTED_SERVICES } from './constants';

function user(state = {}, action) {
    switch (action.type) {
        case USER_LOGIN:
            return action.user;
        default:
            return state;
    }
}

function token(state = '', action) {
    switch (action.type) {
        case USER_LOGIN:
            return action.token;
        default:
            return state;
    }
}

function selectedServices(state = [], action) {
    switch (action.type) {
        case SET_SELECTED_SERVICES:
            console.log('new state: ', action.selected);
            return action.selected;
        default:
            return state;
    }
}

// reducer for the state of create appointments
const createAppointmentReducer = combineReducers({
    selectedServices,
});

const mainReducer = combineReducers({
    user,
    token,
    createAppointment: createAppointmentReducer,
});

export default mainReducer;
