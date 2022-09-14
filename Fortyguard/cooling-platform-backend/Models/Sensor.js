const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  temperature: {
    current: {
      type: Number,
      default: null,
    },
    previous: {
      type: Number,
      default: null,
    },
  },
  humidity: {
    current: {
      type: Number,
      default: null,
    },
    previous: {
      type: Number,
      default: null,
    },
  },
  "4gCoverage": {
    type: Number,
    default: null,
  },
  powerUsage: {
    type: Number,
    default: null,
  },
  location: {
    lat: {
      type: Number,
      default: null,
    },
    lon: {
      type: Number,
      default: null,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sensor", SensorSchema);
