var jwt = require('jwt-simple'); // Library to generate tokens
var moment = require('moment');
var secret = 'secret_key'; // Key that the encryotation algorithim uses

// Generates an exclusive token for each user
createToken = function(user){
    // Parameter that we are going to use to generate the token
    var payload = {
        sub: user._id,
        iat: moment().unix(), // Creation date of the token in timestipm unix format
        exp: moment().add(7, 'days').unix(), // Expiration time for the token
    };

    return jwt.encode(payload, secret)
};

module.exports = {
    createToken
}

