/**
 * A generic basic-auth middleware for node-express
 * Created by m.s.h on 15/2/17.
 */

const authConfig = require('./config/authConfig.js');
const basicAuth = require('basic-auth');

const authMiddleware = (req, res, next) => {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  }

  const user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  if (user.name === authConfig.USERNAME && user.pass === authConfig.PASSWORD) {
    return next();
  } else {
    return unauthorized(res);
  }
};

module.exports = authMiddleware;
