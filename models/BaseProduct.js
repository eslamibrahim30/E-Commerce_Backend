const mongoose = require('mongoose');

const baseProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: String,
  stock: Number
});

module.exports = mongoose.model('Product', baseProductSchema);