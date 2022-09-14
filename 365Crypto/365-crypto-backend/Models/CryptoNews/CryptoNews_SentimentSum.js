const mongoose = require("mongoose");

const CryptoNewsSentimentSumSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: null,
    },
    positive: {
      type: Number,
      default: null,
    },
    neutral: {
      type: Number,
      default: null,
    },
    negative: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CryptoNews_SentimentSum",
  CryptoNewsSentimentSumSchema
);
