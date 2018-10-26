const { service, services } = require("./ServiceQueries")
const { user, users } = require("./UserQueries")

function info(){
    return "Backend for The Rek application";
}

async function usersByServicesAndAvailability(parent, args, ctx, info){
    console.log('in get: ', args);

    let where_query = {};

    // console.log('info: ', info);
    if(args.filterData){
        const { employeeFilterIds, serviceFilterIds, desiredStartTime } = args.filterData;
        
        // build where query

        // add employee filter
        if(employeeFilterIds){
            where_query.id_in = employeeFilterIds;
        }

        // add service filter
        if(serviceFilterIds){
            where_query.services_some = { id_in: serviceFilterIds };
        }

        // add time filter
        if(desiredStartTime){
            let dst = desiredStartTime; // for ease of use

            // update where query to filter by removing people who can't be booked at their desired time
            where_query.employeeSchedule = {

                // if they work during desired time
                workingTimes_some: {
                    start_lt: dst,
                    end_gt: dst
                },

                // if they don't already have appointment during desired time
                appointments_every:{
                    start_gt: dst,
                    end_lt: dst
                }
            }
        }

        console.log("where: ", where_query);
    }

    const users = await ctx.db.users({where: where_query}, '{ id }');
    // const users = await ctx.db.users({where: where_query}, info);
    

    console.log("users RESULT:", users);
    // console.log("MAP:", EmployeeToScheduleToServices.map(item => item.id));

    return users;

    // return [{
    //     EmployeeToScheduleToServices
    // }];

    // return EmployeeToScheduleToServices.map(item => item.id);
    // return {
    //     EmployeeToScheduleToServicesIds: EmployeeToScheduleToServices.map(item => item.id)
    // };
}

const Query = {
    info,
    user,
    users,
    service,
    services,
    usersByServicesAndAvailability
    // getEmployeeSchedulesServices
}

module.exports = Query;