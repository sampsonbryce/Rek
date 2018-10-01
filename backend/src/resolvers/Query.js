function info(){
    return "Backend for The Rek application";
}

async function user(root, args, context, info){
    let user = await context.db.query.user({where: {email: args.email}}, info);
    console.log('user', user);
    return user;
}


module.exports = {
    info,
    user
}