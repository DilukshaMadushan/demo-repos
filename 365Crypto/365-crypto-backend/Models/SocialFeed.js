const mongoose = require("mongoose");

const Social_FeedSchema = new mongoose.Schema({
  coins: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Coin",
      default: null,
    },
  ],
  topicId: {
    type: mongoose.Schema.ObjectId,
    ref: "Social_Feed_Topic",
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  link: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: null,
  },
  platform: {
    type: String,
    enum: ["youtube", "twitter", "reddit"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Social_Feed", Social_FeedSchema);
