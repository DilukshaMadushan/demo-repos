const mongoose = require("mongoose");

const Liquidation_5minSchema = new mongoose.Schema(
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
    price: {
      type: Number,
      default: null,
    },
    liquidationShort: {
      type: Number,
      default: null,
    },
    liquidationLong: {
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
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Liquidation_5min", Liquidation_5minSchema);
