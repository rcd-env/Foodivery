const jwt = require("jsonwebtoken");
const FoodPartnerModel = require("../models/foodPartner.model");
const UserModel = require("../models/user.model");

async function isUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "Register or login first.",
    });
  }
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const existingUser = await UserModel.findOne({
      _id: decodedUser.id,
    });

    if (!existingUser) {
      return res.status(401).json({
        message: "Token is not valid.",
      });
    }
    req.user = existingUser;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Token is not valid.",
    });
  }
}

async function isFoodPartner(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "Register or login first.",
    });
  }
  try {
    const decodedFoodPartner = jwt.verify(token, process.env.JWT_SECRET);
    const existingFoodPartner = await FoodPartnerModel.findOne({
      _id: decodedFoodPartner.id,
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
  isUser,
};
