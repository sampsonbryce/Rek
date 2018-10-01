
class EmptyRolesError extends Error {
    constructor(message){
        super(message);
        // make sure the name is the same and the class name
        this.name = this.constructor.name;
        this.type = "empty_role";
        this.message = message || 
            'User must have a role';
        this.details = "User's cannot have an empty list of roles. \
                Their default role is User. Something went wrong \
                when creating or updating the user";
    }
}

module.exports = {
    EmptyRolesError
}