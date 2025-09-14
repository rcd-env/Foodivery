const router = require("express").Router();

const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validateFoodItem = require("../middlewares/foodValidation.middleware");

router.get("/", foodController.getFoods);

router.post(
  "/",
  authMiddleware.isFoodPartner,
  upload.single("video"),
  validateFoodItem,
  foodController.createFood
);

module.exports = router;
