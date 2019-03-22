const User = require('../models/User');
const { HttpError } = require('./error');
const bearerToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';


  const token = authHeader.replace(/Bearer\s/i, '');

  req.token = token;
  next();
};
   

const ensureAuth = (req, res, next) => {
  //assume that req.token exists
  //user.findbytoken(req.token)
  //them set req.user to found user
  //if no found user call 401 expired token
  //catch errors
  return User.findByToken(req.token)
    .then(user => {
      if(!user) {
        return next(new HttpError(400, 'Not a valid token'));
      }
      req.user = user;
      next();
    })
    .catch(next);
};

module.exports = {
  bearerToken, 
  ensureAuth
};

