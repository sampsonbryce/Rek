async function appointments(root, args, ctx, info) {
    console.log('in appointments');
    console.log('root: ', root);
    console.log('args: ', args);
    const user_appointments = await ctx.db.userSchedule({ id: root.id }).appointments();
    console.log('got appointments', user_appointments);
    return user_appointments;
}

module.exports = {
    appointments,
};
