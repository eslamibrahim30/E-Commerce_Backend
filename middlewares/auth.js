const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Token } = require('../models/Token');

exports.authcheck = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Header not provided' });
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
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid token not matched' });
      }
      req.verified = verified;
      next();
    }
    // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // const tokenDoc = await Token.findOne({ userId: decodedToken._id });

    // if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
    //   return res.status(401).json({ error: 'Invalid or expired token' });
    // }

    // const isMatch = await bcrypt.compare(token, tokenDoc.token);
    // if (!isMatch) {
    //   return res.status(401).json({ error: 'Invalid token' });
    // }

    // req.user = decodedToken;
    // next();
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
