function info(){
    return "Backend for The Rek application";
}

async function user(root, args, ctx, info){
    let user = await ctx.db.user({id: args.id}, info);
    return user;
}

async function users(root, args, ctx, info){
    let users = await ctx.db.users();
    return users;
}

async function userSearch(root, args, ctx, info){

    return ctx.db.users({where: {name_contains: args.name}});
}


module.exports = {
    info,
    user,
    users,
    userSearch
}