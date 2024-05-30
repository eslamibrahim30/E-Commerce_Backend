const mongoose = require('mongoose');
const baseProductSchema = require('./baseProductSchema');

const laptopSchema = baseProductSchema.extend({
  brand: { type: String, required: true },
  processor: { type: String },
  ram: { type: Number },
  screenSize: { type: Number },
  // Additional laptop-specific fields...
});

module.exports = mongoose.model('Laptop', laptopSchema);