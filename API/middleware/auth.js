const jwt = require('jwt');
const moment = require('moment');
const jwt = require('./services/jwt');

function isAuth(req, res, next) {
    //Checks if in the request header there is a field called autorization
    if (!req.headers.autorization) {
        return res.status(403).send({ message: "No tienes autorizacion" })
    }
    //Split transforms the header in an array
    const token = req.headers.autorization.split(" ")[1];
    const payload = jwt.decode(token, secret);

    if (payload.exp < moment().unix()) {
        return res.status(401).send({ message: "El token ha expirado" })
    }
    req.user = payload.sub
    next();
}
module.exports = isAuth;