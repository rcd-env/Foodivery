const mongoose = require("mongoose");

const FoodPartnerSchema = new mongoose.Schema(
  {
    name: {
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

const FoodPartnerModel = mongoose.model("foodPartner", FoodPartnerSchema);
module.exports = FoodPartnerModel;
