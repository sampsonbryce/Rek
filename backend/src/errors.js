const { createError } = require('apollo-errors');

const ServerError = createError('ServerError', {
    message: 'Something went wrong on our end. Please try again later',
});

const InvalidCredentialsError = createError('InvalidCredentialsError', {
    message: 'The provided credentials are invalid',
});

const UniqueFieldAlreadyExists = createError('UniqueFieldAlreadyExists', {
    message: 'A field already exists',
});

const UserNotAuthenticated = createError('UserNotAuthenticated', {
    message: 'User is not authenticated',
});

module.exports = {
    InvalidCredentialsError,
    UniqueFieldAlreadyExists,
    UserNotAuthenticated,
    ServerError,
};
