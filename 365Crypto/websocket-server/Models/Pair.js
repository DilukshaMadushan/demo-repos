const mongoose = require("mongoose");

const PairSchema = new mongoose.Schema({
  exchange: {
    type: mongoose.Schema.ObjectId,
    ref: "Exchange",
    required: true,
  },
  coin: {
    type: mongoose.Schema.ObjectId,
    ref: "Coin",
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  symbolCode: {
    type: String,
    default: null,
  },
  quarter: {
    exp: {
      type: Date,
      default: null,
    },
    type: {
      type: String,
      enum: ["CQ", "NQ", null],
      default: null,
    },
  },
  type: {
    type: String,
    enum: ["spot", "future", "perpetual"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pair", PairSchema);
