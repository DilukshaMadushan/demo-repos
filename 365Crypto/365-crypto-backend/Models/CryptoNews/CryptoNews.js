const mongoose = require("mongoose");

const CryptoNewsSchema = new mongoose.Schema(
  {
    news_url: {
      type: String,
      default: null,
    },
    image_url: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    source_name: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: null,
    },
    topics: [
      {
        type: String,
        default: null,
      },
    ],
    sentiment: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    tickers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Coin",
        default: null,
      },
    ],
    news_id: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CryptoNews", CryptoNewsSchema);
