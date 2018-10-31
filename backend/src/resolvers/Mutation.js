const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const _ = require('lodash');
const { APP_SECRET, capitalize } = require('../utils');

const {
    ServerError,
    InvalidCredentialsError,
    UniqueFieldAlreadyExists,
    InvalidEmailFormat,
    InvalidName,
    InvalidPassword,
} = require('../errors.js');

/*
 * Signup: Creates a new user and logs them in
 */
async function signup(parent, args, context) {
    // hash the password
    const password = await bcrypt.hash(args.password, 10);

    // begin validation
    if (!validator.isEmail(args.email)) {
        throw new InvalidEmailFormat();
    }

    if (!validator.isAscii(args.name)) {
        throw new InvalidName();
    }

    if (args.password.length < 6) {
        throw new InvalidPassword();
    }

    // Create user
    let user = null;
    try {
        user = await context.db.createUser({
            ...args,
            password,
            roles: {
                create: {
                    user: true,
                },
            },
        });
    } catch (err) {
        console.log('err json: ', JSON.stringify(err)); // eslint-disable-line no-console
        const e = err.result.errors[0];

        // handle unique field already exists error
        if (e.code === 3010) {
            const field = e.message.split('=')[1].trim();
            throw new UniqueFieldAlreadyExists({
                data: {
                    message: `${capitalize(field)} already exists`,
                },
            });
        } else {
            // default error
            throw new ServerError({
                data: {
                    message: e.message,
                },
            });
        }
    }

    // create JWT
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
}

// User login functionality
async function login(parent, args, context) {
    if (!validator.isEmail(args.email)) {
        throw new InvalidEmailFormat();
    }

    if (args.password.length < 6) {
        throw new InvalidPassword();
    }

    // check if email exists
    const user = await context.db.user({ email: args.email }, `{ id password }`);

    if (!user) {
        throw new InvalidCredentialsError();
    }

    // check if password matched email
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new InvalidCredentialsError();
    }

    // / create JWT
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
}

/*
 * Updates the user and the roles for the user
 */
async function updateUserWithRoles(parent, args, context) {
    const user = await context.db.updateUser({
        data: {
            email: args.email,
            name: args.name,
            roles: {
                update: args.roles,
            },
        },
        where: {
            id: args.id,
        },
    });
    return user;
}

/*
 * Adds a new service
 */
async function addService(parent, args, context) {
    const service = await context.db.createService({ ...args });
    return service;
}

/*
 * Updates a service
 */
async function updateService(parent, args, context) {
    const args_clone = _.clone(args);
    const { id } = args_clone;

    delete args_clone.id;
    const service = await context.db.updateService({ data: { ...args_clone }, where: { id } });
    return service;
}

module.exports = {
    signup,
    login,
    updateUserWithRoles,
    addService,
    updateService,
};
