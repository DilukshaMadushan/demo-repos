const mongoose = require("mongoose");

const HeatPointSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: null,
  },
  lon: {
    type: Number,
    default: null,
  },
  lat: {
    type: Number,
    default: null,
  },
  "T[C]": {
    type: Number,
    default: null,
  },
  "Tdp[°C]": {
    type: Number,
    default: null,
  },
  "Speed[km/h]": {
    type: Number,
    default: null,
  },
  "Pres[mbar]": {
    type: Number,
    default: null,
  },
  "Hum[%]": {
    type: Number,
    default: null,
  },
  "Alt[m]": {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HeatPoint", HeatPointSchema);
