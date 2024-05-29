const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'User'
    },
    token: {
      type: String,
      // required: true,
    },
    expiresAt: {
      type: Date,
      // required: true,
    },
  });

const Token = mongoose.model('Token', tokenSchema);
module.exports = { Token };
