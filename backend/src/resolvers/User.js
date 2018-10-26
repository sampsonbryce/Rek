async function roles(root, args, ctx, info){
    let roles = await ctx.db.user({id: root.id}).roles();
    return roles;
}

async function services(root, args, ctx, info){
    let services = await ctx.db.user({id: root.id}).services();
    return services;
}

async function employeeSchedule(root, args, ctx, info){
    console.log('in employee schedule');
    let schedule = await ctx.db.user({id: root.id}).employeeSchedule();
    console.log('got schedule: ', schedule);
    return schedule;
}

async function userSchedule(root, args, ctx, info){
    let schedule = await ctx.db.user({id: root.id}).userSchedule();
    console.log("got schedule: ", schedule);
    return schedule;
}

module.exports = { 
    services,
    employeeSchedule,
    userSchedule,
    roles,
};