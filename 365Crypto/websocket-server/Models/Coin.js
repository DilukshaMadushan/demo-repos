const mongoose = require("mongoose");

const CoinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    symbol: {
      type: String,
      default: null,
    },
    image: {
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
    allTimeHigh: {
      type: Number,
      default: null,
    },
    allTimeLow: {
      type: Number,
      default: null,
    },
    marketCap: {
      type: Number,
      default: null,
    },
    circulatingSupply: {
      type: Number,
      default: null,
    },
    maxSupply: {
      type: Number,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Reverse populate with virtuals
CoinSchema.virtual("Pair", {
  ref: "Pair",
  localField: "_id",
  foreignField: "_id",
  justOne: false,
});

module.exports = mongoose.model("Coin", CoinSchema);
