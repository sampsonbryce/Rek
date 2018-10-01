async function roles(root, args, context, info){
    console.log("root", root);
    let roles = await context.db.query.user({ where: {id: root.id}}).role();
    console.log('roles: ', roles);

    return roles;
}

module.exports = { roles };