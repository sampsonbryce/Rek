import { USER_LOGIN } from './constants';

function userLogin(user, token) {
    return { type: USER_LOGIN, user, token };
}

export { userLogin }; // eslint-disable-line
