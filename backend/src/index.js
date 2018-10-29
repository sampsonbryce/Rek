const { GraphQLServer } = require('graphql-yoga');
const { formatError } = require('apollo-errors');
const { prisma } = require('./generated/prisma-client'); // eslint-disabe-line import/no-unresolved
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');
const User = require('./resolvers/User');
const EmployeeSchedule = require('./resolvers/EmployeeSchedule');
const UserSchedule = require('./resolvers/UserSchedule');
const Employee = require('./resolvers/Employee');

/* eslint no-console: 0 */

const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    User,
    UserSchedule,
    EmployeeSchedule,
    Employee,
};

/*
* Logger function to log the Request and Response of all graphql queries
*/
const log = async (resolve, root, args, context, info) => {
    console.log(`REQUEST: ${JSON.stringify(args, null, 3)}`);
    const result = await resolve(root, args, context, info);
    console.log(`RESPONSE: ${JSON.stringify(result, null, 2)}`);
    console.log('--------------------------------------------------');

    return result;
};

const options = {
    formatError,
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: prisma,
    }),
    middlewares: [log],
});

server.start(options, () => console.log('Server is running on http://localhost:4000'));
