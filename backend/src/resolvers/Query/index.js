const { service, services } = require("./ServiceQueries")
const { user, users } = require("./UserQueries")

function info(){
    return "Backend for The Rek application";
}

async function getEmployeeSchedulesServices(parent, args, ctx, info){
    console.log('in get: ', args);

    let EmployeeToScheduleToServices = null;
    // console.log('info: ', info);
    if(args.filterData){
        const { employeeFilterIds, serviceFilterIds, desiredStartTime } = args.filterData;
        
        // build where query
        let where_query = {};

        // add employee filter
        if(employeeFilterIds){
            where_query.employee = { id_in: employeeFilterIds };
        }

        // add service filter
        if(serviceFilterIds){
            where_query.services_some = { id_in: serviceFilterIds };
        }

        // add time filter
        if(desiredStartTime){
            let dst = desiredStartTime; // for ease of use

            // update where query to filter by removing people who can't be booked at their desired time
            where_query.schedule = {

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
        EmployeeToScheduleToServices = await ctx.db.employeeToScheduleToServiceses({where: where_query}, '{ id }');
    }

    // get all results
    else{
        EmployeeToScheduleToServices = await ctx.db.employeeToScheduleToServiceses(null, '{ id }');
    }

    console.log("ETSTS RESULT:", EmployeeToScheduleToServices);
    console.log("MAP:", EmployeeToScheduleToServices.map(item => item.id));

    return [{
        EmployeeToScheduleToServices
    }];

    return EmployeeToScheduleToServices.map(item => item.id);
    return {
        EmployeeToScheduleToServicesIds: EmployeeToScheduleToServices.map(item => item.id)
    };
}

const Query = {
    info,
    user,
    users,
    service,
    services,
    getEmployeeSchedulesServices
}

module.exports = Query;