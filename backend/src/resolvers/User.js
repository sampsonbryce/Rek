async function roles(root, args, ctx, info){
    let roles = await ctx.db.user({id: root.id}).roles();
    return roles;
}

module.exports = { 
    roles,
};