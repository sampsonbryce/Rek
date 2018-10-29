async function roles(root, args, ctx, info) {
    const user_roles = await ctx.db.user({ id: root.id }).roles();
    return user_roles;
}

async function services(root, args, ctx, info) {
    const user_services = await ctx.db.user({ id: root.id }).services();
    return user_services;
}

async function userSchedule(root, args, ctx, info) {
    const user_schedule = await ctx.db.user({ id: root.id }).userSchedule();
    console.log('got schedule: ', user_schedule);
    return user_schedule;
}

module.exports = {
    services,
    userSchedule,
    roles,
};
