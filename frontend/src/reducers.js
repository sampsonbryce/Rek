import { combineReducers } from 'redux';
import _ from 'lodash';
import { USER_LOGIN, SET_SELECTED_SERVICES, SET_SELECTED_PEOPLE } from './constants';

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
            return _.clone(action.selected);
        default:
            return state;
    }
}

function selectedPeople(state = [], action) {
    switch (action.type) {
        case SET_SELECTED_PEOPLE:
            return _.clone(action.selected);
        default:
            return state;
    }
}

// reducer for the state of create appointments
const createAppointmentReducer = combineReducers({
    selectedServices,
    selectedPeople,
});

const mainReducer = combineReducers({
    user,
    token,
    createAppointment: createAppointmentReducer,
});

export default mainReducer;
