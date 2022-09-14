const mongoose = require("mongoose");
const Exchanges_Properties = require("./Mappings/_virtualExchangesProperties");

const ExchangeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Reverse populate with virtuals
Exchanges_Properties.map((property, id) =>
  ExchangeSchema.virtual(property.name, {
    ref: property.ref,
    localField: "_id",
    foreignField: property.foreignField,
    justOne: false,
  })
);

module.exports = mongoose.model("Exchange", ExchangeSchema);
