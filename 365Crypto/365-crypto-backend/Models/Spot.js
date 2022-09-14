const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema(
  {
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
    high: {
      type: Number,
      default: null,
    },
    low: {
      type: Number,
      default: null,
    },
    change: {
      type: Number,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Spot", SpotSchema);
