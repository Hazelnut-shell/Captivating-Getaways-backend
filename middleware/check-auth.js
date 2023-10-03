const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    // if there isn't an anthorization header in the request, there will be an error. So better to wrap in try catch
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN', extract the token manually
    if (!token) {
      throw new Error('Authentication failed!');
    }

    // if the token is not valid, an error will be thrown
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.userData = { userId: decodedToken.userId }; 

    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
