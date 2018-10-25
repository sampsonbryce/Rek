
async function user(root, args, ctx, info){
    console.log("in user: ");
    console.log("ROOT: ", root);
    console.log("args: ", root);
    let user = await ctx.db.user({id: args.id}, info);
    return user;
}

async function users(root, args, ctx, info){
    let users = await ctx.db.users();
    return users;
}

module.exports = {
    user,
    users,
}