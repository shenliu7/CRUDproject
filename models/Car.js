const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  isRented: {
    type: Boolean,
    default: false,
  },
  rentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;

