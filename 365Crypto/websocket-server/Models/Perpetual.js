const mongoose = require("mongoose");

const PerpetualSchema = new mongoose.Schema({
  exchange: {
    type: mongoose.Schema.ObjectId,
    ref: "Exchange",
    required: true,
  },
  pair: {
    type: mongoose.Schema.ObjectId,
    ref: "Pair",
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
  fundingRate: {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Perpetual", PerpetualSchema);
