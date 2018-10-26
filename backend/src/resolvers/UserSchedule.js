async function appointments(root, args, ctx, info){
    console.log('in appointments');
    console.log("root: ", root);
    console.log("args: ", args);
    let appointments = await ctx.db.userSchedule({id: root.id}).appointments();
    console.log('got appointments', appointments);
    return appointments;
}

module.exports = { 
    appointments,
};