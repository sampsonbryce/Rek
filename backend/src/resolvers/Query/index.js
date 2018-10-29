const { service, services } = require('./ServiceQueries');
const { user, users } = require('./UserQueries');

async function employees(parent, args, ctx, info) {
    console.log('IN GET EMPLOYEES: ', args);

    const where_query = {};

    if (args.filterData) {
        const { employeeFilterIds, serviceFilterIds, desiredStartTime } = args.filterData;

        // build where query

        // add employee filter
        if (employeeFilterIds) {
            where_query.user = { id_in: employeeFilterIds };
        }

        // add service filter
        if (serviceFilterIds) {
            where_query.services_some = { id_in: serviceFilterIds };
        }

        // add time filter
        if (desiredStartTime) {
            const dst = desiredStartTime; // for ease of use

            // update where query to filter by removing people who can't be booked at their desired time
            where_query.schedule = {
                // if they work during desired time
                workingTimes_some: {
                    start_lt: dst,
                    end_gt: dst,
                },

                // if they don't already have appointment during desired time
                appointments_every: {
                    start_gt: dst,
                    end_lt: dst,
                },
            };
        }
    }

    const db_employees = await ctx.db.employees({ where: where_query });
    console.log('got employees: ', db_employees);
    return db_employees;
}

async function servicesByEmployeesAndAvailability(parent, args, ctx, info) {
    console.log('in get: ', args);

    const where_query = {};

    if (args.filterData) {
        const { employeeFilterIds, serviceFilterIds, desiredStartTime } = args.filterData;

        // build where query

        // add employee filter
        if (employeeFilterIds) {
            where_query.id_in = employeeFilterIds;
        }

        // add service filter
        if (serviceFilterIds) {
            where_query.services_some = { id_in: serviceFilterIds };
        }

        // add time filter
        if (desiredStartTime) {
            const dst = desiredStartTime; // for ease of use

            // update where query to filter by removing people who can't be booked at their desired time
            where_query.employeeSchedule = {
                // if they work during desired time
                workingTimes_some: {
                    start_lt: dst,
                    end_gt: dst,
                },

                // if they don't already have appointment during desired time
                appointments_every: {
                    start_gt: dst,
                    end_lt: dst,
                },
            };
        }
    }

    const user_services = await ctx.db.users({ where: where_query }).services();
    console.log('got services: ', services);
    // services = services.map(item =>{
    //     item
    // })
    return user_services;
}

const Query = {
    user,
    users,
    service,
    services,
    employees,
    servicesByEmployeesAndAvailability,
};

module.exports = Query;
