const mongoose = require("mongoose");

const OpenInterestVolumeHistory_1hrSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    default: null,
  },
  volume: {
    type: Number,
    default: null,
  },
  openInterest: {
    type: Number,
    default: null,
  },
  dateTime: {
    type: Date,
    default: null,
  },
  type: {
    type: String,
    enum: ["future", "perpetual"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "OpenInterestVolumeHistory_1hr",
  OpenInterestVolumeHistory_1hrSchema
);
