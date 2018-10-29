
async function user(root, args, ctx, info){
    console.log("in user of employee: ");
    console.log("ROOT: ", root);
    console.log("args: ", root);
    let employee = await ctx.db.employee({employeeId: root.employeeId}).user();
    console.log("GOT EMPLOYEE: ", employee);
    return employee;
}

async function services(root, args, ctx, info){
    console.log("in services: ");
    console.log("ROOT: ", root);
    console.log("args: ", root);
    let services = await ctx.db.employee({employeeId: root.employeeId }).services();
    console.log("GOT services: ", services);
    return services;
}

async function schedule(root, args, ctx, info){
    let schedule = await ctx.db.employee({employeeId: root.employeeId}).schedule();
    console.log('got schedule: ', schedule);
    return schedule;
}



const Employee = {
    user,
    services,
    schedule
}

module.exports = Employee;
