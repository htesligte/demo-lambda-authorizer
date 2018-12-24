const jwt = require('jsonwebtoken');

const TOKEN_SECRET = 'wilbert4life';

/**
 Helpers
 */
function signToken(id)
{
    return jwt.sign({ id: id }, TOKEN_SECRET, {
        expiresIn: 86400
    });
}

function login(eventBody)
{
    return eventBody.username === "henk" && eventBody.password === "PvG";
}

module.exports.login = (data, context) => {
    if (login(data)) {
        return { auth: true, token: signToken(1234) };
    }
    return false;
};

