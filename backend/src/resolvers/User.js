async function roles(root, args, ctx, info){
    console.log("root", root);
    let roles = await ctx.db.user({id: root.id}).roles();
    console.log('roles: ', roles);

    return roles;
}

module.exports = { roles };