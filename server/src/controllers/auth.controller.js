const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.model");
const FoodPartnerModel = require("../models/foodPartner.model");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;
  const isUserAlreadyExists = await UserModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    fullName,
    email,
    password: hashedPassword,
  });
  const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res.status(200).json({
    message: "User registered successfully.",
    user: {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    },
  });
}
async function loginUser(req, res) {
  const { email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }
  const isPassValid = await bcrypt.compare(password, existingUser.password);
  if (!isPassValid) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  const token = await jwt.sign(
    { id: existingUser._id },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully.",
    user: {
      _id: existingUser._id,
      fullName: existingUser.fullName,
      email: existingUser.email,
    },
  });
}
function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully.",
  });
}
async function registerFoodPartner(req, res) {
  const { brandName, contactName, phone, location, email, password } = req.body;
  const isFoodPartnerAlreadyExists = await FoodPartnerModel.findOne({ email });

  if (isFoodPartnerAlreadyExists) {
    return res.status(400).json({
      message: "Food Partner already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newFoodPartner = await FoodPartnerModel.create({
    brandName,
    contactName,
    phone,
    location,
    email,
    password: hashedPassword,
  });
  const token = jwt.sign({ id: newFoodPartner._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res.status(200).json({
    message: "Food partner registered successfully.",
    user: {
      _id: newFoodPartner._id,
      name: newFoodPartner.name,
      email: newFoodPartner.email,
    },
  });
}
async function loginFoodPartner(req, res) {
  const { email, password } = req.body;
  const existingFoodPartner = await FoodPartnerModel.findOne({ email });
  if (!existingFoodPartner) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }
  const isPassValid = await bcrypt.compare(
    password,
    existingFoodPartner.password
  );
  if (!isPassValid) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  const token = await jwt.sign(
    { id: existingFoodPartner._id },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "Food partner logged in successfully.",
    user: {
      _id: existingFoodPartner._id,
      name: existingFoodPartner.name,
      email: existingFoodPartner.email,
    },
  });
}
async function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food partner logged out successfully.",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
