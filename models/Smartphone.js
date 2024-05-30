const mongoose = require('mongoose');
const baseProductSchema = require('./baseProductSchema');

const smartphoneSchema = baseProductSchema.extend({
  brand: { type: String, required: true },
  operatingSystem: { type: String },
  screenSize: { type: Number },
  cameraResolution: { type: Number },
  // Additional smartphone-specific fields...
});

module.exports = mongoose.model('Smartphone', smartphoneSchema);