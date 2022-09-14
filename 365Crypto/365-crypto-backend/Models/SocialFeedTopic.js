const mongoose = require("mongoose");

const Social_Feed_TopicSchema = new mongoose.Schema({
  topic: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  feedLink: {
    type: String,
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

module.exports = mongoose.model("Social_Feed_Topic", Social_Feed_TopicSchema);
