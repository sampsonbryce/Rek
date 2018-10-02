function info(){
    return "Backend for The Rek application";
}

async function user(root, args, ctx, info){
    let user = await ctx.db.user({email: args.email}, info);
    console.log('user', user);
    return user;
}


module.exports = {
    info,
    user
}