export const USER_LOGIN = 'USER_LOGIN';

export function userLogin(user){
    return { type: USER_LOGIN, user };
}