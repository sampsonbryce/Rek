const { services } = require("./Query/ServiceQueries");
const { user } = require("./Query/UserQueries");

async function employee(root, args, ctx, info){
    console.log("in employee: ");
    console.log("ROOT: ", root);
    console.log("args: ", root);
    console.log("info: ", info);
    let employee = await ctx.db.EmployeeToScheduleToServices({id: args.id}, info);
    console.log("GOT EMPLOYEE: ", employee);
    return employee;
}

const EmployeeToScheduleToServices = {
    services,
    employee,
}

module.exports = EmployeeToScheduleToServices;
