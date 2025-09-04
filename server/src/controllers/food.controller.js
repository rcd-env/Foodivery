const { uploadFile } = require("../configs/imagekit.config");
const FoodModel = require("../models/food.model");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  const { name, description } = req.body;
  const uploadResult = await uploadFile(req.file.buffer, uuid());

  const newFood = await FoodModel.create({
    name,
    description,
    video: uploadResult.url,
    foodPartner: req.foodPartner._id,
  });
  res.status(201).json({
    message: "New food item added.",
    foodItem: {
      name: newFood.name,
      description: newFood.description,
      videoURL: newFood.video,
      foodPartner: {
        _id: req.foodPartner._id,
        name: req.foodPartner.name,
        email: req.foodPartner.email,
      },
    },
  });
}

module.exports = { createFood };
