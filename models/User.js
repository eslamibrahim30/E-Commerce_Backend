const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const jwt = require('jsonwebtoken');
const { Token } = require('../models/Token');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name required'],
  },
  email: {
    type: String,
    required: [true, 'email required'],
    unique: true,
    validate: [ isEmail, 'not valid email'],
    },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [6, 'at laset > 6'],
  },
  shippingAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  phoneNumber: { type: String },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};
userSchema.methods.generateAuthToken = async function(req, res) { 
  const user = this;
  const token = jwt.sign({ _id:user._id.toHexString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const salt = await bcrypt.genSalt(10);
  const hashedToken = await bcrypt.hash(token, salt);
  const expiresAt = new Date(Date.now() + 3600000);
  let tokenDoc = await Token.findOne({ _id: user._id });
  if (tokenDoc) {
    tokenDoc.token = hashedToken;
    tokenDoc.expiresAt = expiresAt;
  } else {
    tokenDoc = new Token({
      _id: user._id,
      token: hashedToken,
      expiresAt,
    });
  }
  await tokenDoc.save();
  return token;
}

module.exports = mongoose.model('User', userSchema);
