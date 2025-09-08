const mongoose = require("mongoose");

const FoodPartnerSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

const FoodPartnerModel = mongoose.model("foodpartner", FoodPartnerSchema);
module.exports = FoodPartnerModel;
