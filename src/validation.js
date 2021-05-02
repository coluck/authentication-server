/* Validation with joi   
  https://joi.dev/api/?v=17.4.0
 */
const Joi = require("joi");

const registerValidation = Joi.object({
  username: Joi.string().alphanum().min(2).max(32).required(),
  email: Joi.string().email().max(128).required(),
  password: Joi.string().min(3).max(128).required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().max(128).required(),
  password: Joi.string().min(3).max(128).required(),
});

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
