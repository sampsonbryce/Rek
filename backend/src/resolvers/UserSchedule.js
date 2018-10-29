async function appointments(root, args, ctx) {
    const user_appointments = await ctx.db.userSchedule({ id: root.id }).appointments();
    return user_appointments;
}

module.exports = {
    appointments,
};
