
async function service(root, args, ctx, info){
    console.log("in service!");
    return ctx.db.service({id: args.id}, info);
}

async function services(root, args, ctx, info){
    console.log("in services");
    return ctx.db.services();
}


module.exports = {
    service,
    services,
}