const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');
// const gql = require('graphql-tag');

// User Signup functionality
async function signup(parent, args, context, info){
    // hash the password
    const password = await bcrypt.hash(args.password, 10);

    // args.roles = ["USER"];
    // console.log("ARGS", args);

    console.log('creating user: ', info);
    console.log(context);
    console.log(context.db);
    // Create user
    const user = await context.db.createUser({ ...args, password, 
        roles: { 
            create: {
                user: true
            }
        }
    });

// , `{ id }`

    // await context.db.mutation.updateUser()

    // create JWT
    const token = jwt.sign({ userId: user.id}, APP_SECRET);

    return {
        token, 
        user,
    }
}

// User login functionality
async function login(parent, args, context, info){
    // check if email exists
    const user = await context.db.user({ where: { email: args.email }},`{ id password }`);
    if(!user){
        throw new Error('No such user found');
    }

    // check if password matched email
    const valid = await bcrypt.compare(args.password, user.password);
    if(!valid){
        throw new Error('Invalid Password');
    }


    /// create JWT
    const token = jwt.sign({userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    }
}

module.exports = {
    signup,
    login,
}
