const mongoose = require("mongoose");

const CryptoNewsSentimentSchema = new mongoose.Schema(
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
    sentiment_score: {
      type: Number,
      default: null,
    },
    coin: {
      type: mongoose.Schema.ObjectId,
      ref: "Coin",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CryptoNews_Sentiment",
  CryptoNewsSentimentSchema
);
