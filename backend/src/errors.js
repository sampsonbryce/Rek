const { createError } = require('apollo-errors');

const ServerError = createError("ServerError", {
    message: "Something went wrong on the server"
});

const InvalidCredentialsError = createError("InvalidCredentialsError", {
    message: "The provided credentials are invalid"
});

const UniqueFieldAlreadyExists = createError("UniqueFieldAlreadyExists", {
    message: "A field already exists"
});

const InvalidEmailFormat = createError("InvalidEmailFormat", {
    message: "not a valid email format"
});



module.exports = {
    InvalidCredentialsError,
    UniqueFieldAlreadyExists,
    ServerError,
}