async function workingTimes(root, args, ctx) {
    console.log('ARGS: ', args);
    // return ctx.db.employee({ id: args.id }).schedule().workingTimes({where: {
    //     start_gt: args.
    // }});
    return [];
}

module.exports = {
    workingTimes,
};
