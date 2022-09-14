const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  sensor: {
    type: mongoose.Schema.ObjectId,
    ref: "Sensor",
    required: true,
  },
  name: {
    type: String,
    default: null,
  },
  model: {
    type: String,
    default: null,
  },
  descriptionString: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  plates: {
    type: String,
    default: null,
  },
  department: {
    type: String,
    default: null,
  },
  distanceTravelled: {
    type: String,
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

module.exports = mongoose.model("Vehicle", VehicleSchema);
