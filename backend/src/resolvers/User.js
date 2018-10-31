async function roles(root, args, ctx) {
    const user_roles = await ctx.db.user({ id: root.id }).roles();
    return user_roles;
}

async function services(root, args, ctx) {
    const user_services = await ctx.db.user({ id: root.id }).services();
    return user_services;
}

async function userSchedule(root, args, ctx) {
    const user_schedule = await ctx.db.user({ id: root.id }).userSchedule();
    return user_schedule;
}

module.exports = {
    services,
    userSchedule,
    roles,
};
