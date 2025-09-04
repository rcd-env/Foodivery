const router = require("express").Router();

const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/",
  authMiddleware.isFoodPartner,
  upload.single("video"),
  foodController.createFood
);

module.exports = router;
