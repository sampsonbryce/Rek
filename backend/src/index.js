const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');
const User = require('./resolvers/User');

const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    User,
}

/*
 * Logger function to log the Request and Response of all graphql queries
 */
const log = async (resolve, root, args, context, info) => {
    console.log(`REQUEST: ${JSON.stringify(args, null, 2)}`);
    const result = await resolve(root, args, context, info);
    console.log(`RESPONSE: ${JSON.stringify(result, null, 2)}`);
    console.log('--------------------------------------------------');

    return result;
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: prisma, 
    }),
    middlewares: [log]
})

server.start(() => console.log('Server is running on http://localhost:4000'));
