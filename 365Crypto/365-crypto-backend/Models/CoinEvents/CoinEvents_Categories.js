const mongoose = require("mongoose");

const CoinEvents_CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    marketCalId: {
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

module.exports = mongoose.model(
  "CoinEvents_Categories",
  CoinEvents_CategoriesSchema
);
