const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding')
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

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'http://localhost:4466',
            secret: 'mysecret123',
            debug: true,
        })
    })
})

server.start(() => console.log('Server is running on http://localhost:4000'));
