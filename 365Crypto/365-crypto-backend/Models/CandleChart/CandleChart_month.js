const mongoose = require("mongoose");

const CandleChart_monthSchema = new mongoose.Schema(
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
    volume: {
      type: Number,
      default: null,
    },
    open: {
      type: Number,
      default: null,
    },
    close: {
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
    dateTime: {
      type: Date,
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

module.exports = mongoose.model("CandleChart_month", CandleChart_monthSchema);
