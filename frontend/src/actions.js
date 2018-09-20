import { USER_LOGIN } from './constants';

function userLogin(user, token){
    console.log('USER_LOGIN', USER_LOGIN);
    return { type: USER_LOGIN, user, token };
}

export {
    userLogin
}