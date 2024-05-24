const jwt = require('jsonwebtoken');

exports.authcheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, '');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
