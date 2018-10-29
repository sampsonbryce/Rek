async function user(root, args, ctx, info) {
    const db_user = await ctx.db.user({ id: args.id }, info);
    return db_user;
}

async function users(root, args, ctx) {
    const db_users = await ctx.db.users();
    return db_users;
}

module.exports = {
    user,
    users,
};
