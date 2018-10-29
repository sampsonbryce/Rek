async function service(root, args, ctx, info) {
    return ctx.db.service({ id: args.id }, info);
}

async function services(root, args, ctx, info) {
    return ctx.db.services();
}

module.exports = {
    service,
    services,
};
