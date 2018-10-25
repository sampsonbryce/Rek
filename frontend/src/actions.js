import { USER_LOGIN, SET_SELECTED_SERVICES } from './constants';

function userLogin(user, token) {
    return { type: USER_LOGIN, user, token };
}

function setSelectedServicesAction(selected) {
    return { type: SET_SELECTED_SERVICES, selected };
}

export { userLogin, setSelectedServicesAction };
