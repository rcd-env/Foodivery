const jwt = require("jsonwebtoken");
const FoodPartnerModel = require("../models/foodPartner.model");

async function isFoodPartner(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "Register or login first.",
    });
  }
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const existingFoodPartner = await FoodPartnerModel.findOne({
      _id: decodedUser.id,
    });

    if (!existingFoodPartner) {
      return res.status(401).json({
        message: "Token is not valid.",
      });
    }
    req.foodPartner = existingFoodPartner;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Token is not valid.",
    });
  }
}

module.exports = {
  isFoodPartner,
};
