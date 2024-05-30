const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Token } = require('../models/Token');

const authcheck = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Header not provided or not admin' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const tokenDoc = await Token.findOne({ _id: verified._id }).select('token');
    if (!tokenDoc || tokenDoc.expiresAt < new Date() ) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    if (tokenDoc) {
      const isMatch = await bcrypt.compare(token, tokenDoc.token);
      // console.log(isMatch);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid token not matched' });
      }
      req.verified = verified;
      // console.log(verified.role);
      next();
    }
  } catch(err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired' });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      return res.status(401).json({ error: 'Token error' });
    }
  }
};

const verifyAdmin = (req, res, next) => {
  authcheck (req, res, () => {
    if (req.verified.role === 'admin') {
      next();
    } else {
      return res.status(401).json({ error: 'You are not authorized as Admin!'});
    }
  });
};

module.exports = { authcheck, verifyAdmin };
