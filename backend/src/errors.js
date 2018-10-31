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
    UniqueFieldAlreadyExists,
    ServerError,
    InvalidEmailFormat,
    InvalidName,
    InvalidPassword,
};
