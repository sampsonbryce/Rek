async function user(root, args, ctx) {
    const employee = await ctx.db.employee({ employeeId: root.employeeId }).user();
    return employee;
}

async function services(root, args, ctx) {
    const employee_services = await ctx.db.employee({ employeeId: root.employeeId }).services();
    return employee_services;
}

async function schedule(root, args, ctx) {
    const employee_schedule = await ctx.db.employee({ employeeId: root.employeeId }).schedule();
    return employee_schedule;
}

const Employee = {
    user,
    services,
    schedule,
};

module.exports = Employee;
