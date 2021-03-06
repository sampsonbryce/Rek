async function workingTimes(root, args, ctx) {
    const times = await ctx.db.employeeSchedule({ id: root.id }).workingTimes();
    return times;
}

async function appointments(root, args, ctx) {
    const times = await ctx.db.employeeSchedule({ id: root.id }).appointments();
    return times;
}

module.exports = {
    workingTimes,
    appointments,
};
