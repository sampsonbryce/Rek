async function workingTimes(root, args, ctx, info){
    let times = await ctx.db.employeeSchedule({id: root.id}).workingTimes();
    return times;
}

module.exports = { 
    workingTimes
};