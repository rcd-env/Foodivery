const Joi = require("joi");

const foodSchemaVal = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().trim().min(5).max(500).required(),
  //   video: Joi.string().uri().required(), // ensures valid URL format
  //   foodPartner: Joi.string()
  //     .regex(/^[0-9a-fA-F]{24}$/)
  //     .required(),
  // 👆 validates MongoDB ObjectId format
});

function validateFoodItem(req, res, next) {
  let result = foodSchemaVal.validate(req.body);
  if (result.error) return next(result.error);
  next();
}

module.exports = validateFoodItem;
