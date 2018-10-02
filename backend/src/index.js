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

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: prisma, // null???
    })
})

server.start(() => console.log('Server is running on http://localhost:4000'));
