const jwt = require('jsonwebtoken');

const APP_SECRET = 'GraphQL-is-aw3some'; // TODO: make secure and change

/*
 * Helper function to get logged in user id
 * Also throws error if not authenticated
 */
function getUserId(context) {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, APP_SECRET);
        return userId;
    }

    throw new Error('Not authenticated');
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    APP_SECRET,
    getUserId,
    capitalize,
};
