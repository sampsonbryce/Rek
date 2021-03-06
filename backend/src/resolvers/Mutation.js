const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const _ = require('lodash');
const { APP_SECRET, capitalize, assert, getUserId } = require('../utils');
const { InvalidNumberOfParameters } = require('../errors.js');

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
        // if we don't already have an employee record created
        if (employees.length === 0) {
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

/**
 * Update or insert working times working times to an employee's schedule
 */
async function upsertWorkingTimes(parent, args, ctx) {
    const user_id = getUserId(ctx);

    // TODO: ensure we are employee
    const { dates } = args;

    // weird error where no dates are submitted
    if (dates.length === 0) {
        throw new InvalidNumberOfParameters({
            data: {
                message:
                    'No dates were provided. Please provide at least on date to update or create',
            },
        });
    }

    // const dates_upsert = [];
    let updateOrCreate = null;

    //  if we are creating, id's will be null
    if (dates[0].id == null) {
        updateOrCreate = {
            create: [],
        };
    } else {
        updateOrCreate = {
            update: {},
        };
    }

    // create upsert object
    for (let i = 0; i < dates.length; i += 1) {
        const { id, start, end } = dates[i];
        if (id == null) {
            updateOrCreate.create.push({ start, end });
        } else {
            updateOrCreate.update = { where: { id }, data: { start, end } };
        }
    }

    const schedule = await ctx.db.employee({ employeeId: user_id }).schedule();

    const updated_schedule = await ctx.db.updateEmployeeSchedule({
        where: {
            id: schedule.id,
        },
        data: {
            workingTimes: {
                ...updateOrCreate,
            },
        },
    });

    return updated_schedule;
}

async function deleteWorkingTimes(parent, args, ctx) {
    console.log('DATE IDS: ', args.date_ids);
    const { count } = await ctx.db.deleteManyWorkingTimes({
        id_in: args.date_ids,
    });

    console.log('DELETE_COUNT: ', count);

    return count;
}

module.exports = {
    signup,
    login,
    updateUserWithRoles,
    addService,
    updateService,
    upsertWorkingTimes,
    deleteWorkingTimes,
};
