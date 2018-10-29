/*
 * How I think this works:
 * AuthPayload is the return value from login/signup
 * In those functions we only get the user id
 * Those are the mutation resolvers which get called first
 * Afterwards the return resolver will be called
 * Which is in this file
 * We override the default resolver by naming our function the name of the object (user)
 * Which resolves the user to the actual user info, not just the id
 */
async function user(root, args, ctx, info) {
    const db_user = await ctx.db.user({ id: root.user.id }, info);

    return db_user;
}

module.exports = { user };
