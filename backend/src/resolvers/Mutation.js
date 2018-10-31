const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { APP_SECRET, capitalize, assert } = require('../utils');

const { ServerError, InvalidCredentialsError, UniqueFieldAlreadyExists } = require('../errors.js');

/*
 * Signup: Creates a new user and logs them in
 */
async function signup(parent, args, context) {
    // hash the password
    const password = await bcrypt.hash(args.password, 10);

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
        console.log('err json: ', JSON.stringify(err));
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

/*
 * Login: Logs in the user
 */
async function login(parent, args, context) {
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

    // check if employee record
    const employees = await context.db.employees({
        where: {
            user: {
                id: args.id,
            },
        },
    });

    assert(employees.length < 2); // ensure only one employee record max for a user

    // if we are changing this user to an employee, then we need to create an employee record

    if (args.roles.employee === true) {
        console.log('is employee');

        console.log('got employees: ', employees);
        console.log('employees length: ', employees.length);

        // if we don't already have an employee record created
        if (employees.length === 0) {
            console.log('creating new employee');
            await context.db.createEmployee({
                employeeId: args.id, // employeeId is the same as the user id
                user: {
                    connect: {
                        id: args.id,
                    },
                },
                schedule: {
                    create: {
                        workingTimes: {
                            create: [],
                        },
                        appointments: {
                            create: [],
                        },
                    },
                },
                services: {
                    create: [],
                },
            });
        }
    } else if (args.roles.employee === false && employees.length === 1) {
        // delete employee record if user is not longer an employee
        await context.db.deleteEmployee({
            employeeId: args.id,
        });
    }

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
