const mongoose = require('mongoose');

const FutureSchema = new mongoose.Schema({
  exchange: {
    type: mongoose.Schema.ObjectId,
    ref: 'Exchange',
    required: true,
  },
  pair: {
    type: mongoose.Schema.ObjectId,
    ref: 'Pair',
    required: true,
  },
  unicode: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    default: null,
  },
  volume: {
    type: Number,
    default: null,
  },
  short: {
    type: Number,
    default: null,
  },
  long: {
    type: Number,
    default: null,
  },
  shortPer: {
    type: Number,
    default: null,
  },
  longPer: {
    type: Number,
    default: null,
  },
  openInterest: {
    type: Number,
    default: null,
  },
  oiPer: {
    type: Number,
    default: null,
  },
  index: {
    type: Number,
    default: null,
  },
  expireDate: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Future', FutureSchema);
