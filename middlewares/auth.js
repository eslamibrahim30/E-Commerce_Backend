const jwt = require('jsonwebtoken');

const user = { id: '' };
const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
exports.authcheck = async (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
