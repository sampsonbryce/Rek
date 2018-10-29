import { USER_LOGIN, SET_SELECTED_SERVICES, SET_SELECTED_PEOPLE } from './constants';

function userLogin(user, token) {
    return { type: USER_LOGIN, user, token };
}

function setSelectedServicesAction(selected) {
    return { type: SET_SELECTED_SERVICES, selected };
}

function setSelectedPeopleAction(selected) {
    return { type: SET_SELECTED_PEOPLE, selected };
}

export { userLogin, setSelectedServicesAction, setSelectedPeopleAction };
