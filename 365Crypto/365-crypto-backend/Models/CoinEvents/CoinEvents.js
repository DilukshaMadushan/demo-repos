const mongoose = require('mongoose');

const CoinEventsSchema = new mongoose.Schema({
  coins: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Coin',
      default: null,
    },
  ],
  categories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'CoinEvents_Categories',
      default: null,
    },
  ],
  title: {
    type: String,
    default: null,
  },
  categories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'CoinEvents_Categories',
      default: null,
    },
  ],
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  originalSource: {
    type: String,
    default: null,
  },
  proof: {
    type: String,
    default: null,
  },
  marketCalId: {
    type: Number,
    default: null,
  },
  trendingIndex: {
    type: Number,
    default: null,
  },
  hotIndex: {
    type: Number,
    default: null,
  },
  isHot: {
    type: Boolean,
    default: false,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  isSignificant: {
    type: Boolean,
    default: false,
  },
  dateEvent: {
    type: Date,
    default: null,
  },
  createdDate: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CoinEvents', CoinEventsSchema);
