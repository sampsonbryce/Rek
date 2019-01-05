const { createError } = require('apollo-errors');

const ServerError = createError('ServerError', {
    message: 'Something went wrong on our end. Please try again later',
});

const InvalidNumberOfParameters = createError('InvalidNumberOfParameters', {
    message: 'There was an invalid number of parameters provided',
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

const InvalidEmailFormat = createError('InvalidEmailFormat', {
    message: 'Not a valid email format',
});

const InvalidName = createError('InvalidName', {
    message: 'Invalid Name.',
});

const InvalidPassword = createError('InvalidPassword', {
    message: 'Invalid Password.',
});

module.exports = {
    InvalidCredentialsError,
    InvalidNumberOfParameters,
    UniqueFieldAlreadyExists,
    UserNotAuthenticated,
    ServerError,
    InvalidEmailFormat,
    InvalidName,
    InvalidPassword,
};
