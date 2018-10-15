const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const { ServerError, 
        InvalidCredentialsError, 
        UniqueFieldAlreadyExists } = require('../errors.js');

// User Signup functionality
async function signup(parent, args, context, info){
    // hash the password
    const password = await bcrypt.hash(args.password, 10);

    // Create user
    let user = null;
    try{
        user = await context.db.createUser({ ...args, password, 
            roles: { 
                create: {
                    user: true
                }
            }
        });
    }catch(err){
        console.log("err json: ", JSON.stringify(err));
        let e = err.result.errors[0];

        // handle unique field already exists error
        if(e.code == "3010"){
            let field = e.message.split("=")[1].trim();
            throw new UniqueFieldAlreadyExists({data: {
                message: `${field} already exists`
            }});
        }
        else{
            // default error
            throw new ServerError({data: {
                message: e.message
            }});
        }
    }

    // create JWT
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token, 
        user,
    }
}

// User login functionality
async function login(parent, args, context, info){
    // check if email exists
    const user = await context.db.user({ email: args.email },`{ id password }`);

    if(!user){
        // throw new Error('No such user found');
        throw new InvalidCredentialsError();
    }

    // check if password matched email
    const valid = await bcrypt.compare(args.password, user.password);
    if(!valid){
        throw new InvalidCredentialsError();
    }


    /// create JWT
    const token = jwt.sign({userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    }
}

async function updateUserWithRoles(parent, args, context, info){
   const user = await context.db.updateUser({
        data: {
            email: args.email,
            name: args.name,
            roles: {
                update: args.roles
            }
        },
        where: {
            id: args.id
        }
    });
    return user;
}

module.exports = {
    signup,
    login,
    updateUserWithRoles,
}
