const jwt = require('jsonwebtoken');
const TOKEN_SECRET = 'wilbert4life';

const generatePolicy = (principalId, effect, resource) => {
    const authResponse = {
        principalId: principalId
    };
    if (effect && resource) {
        authResponse.policyDocument = {
            Version: "2012-10-17",
            Statement: [{
                Action: "execute-api:Invoke",
                Effect: effect,
                Resource: resource
            }]
        };
    }
    return authResponse;
};

module.exports.auth = (event, context, callback) => {
    // check header or url parameters or post parameters for token
    const token = event.authorizationToken;

    if (!token) {
        return callback(null, "Unauthorized");
    }

    // verify secret and check expiration
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return callback(null, "Unauthorized");
        }

        // if everything is good, save to request for use in other routes
        return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn));
    });
};

