const jwt = require('jsonwebtoken');
const User = require('../models/User');

// const user = { id: '' };
// const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
const user = new User({ });

exports.authcheck = async (req, res, next) => {
  try{
    const token = await user.generateAuthToken();
    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
