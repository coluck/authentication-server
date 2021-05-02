const { generateToken } = require("../token");
const { loginValidation } = require("../validation");
const User = require("../userModel");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  // Validate request body
  const { error } = loginValidation.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user exist with that email in DB
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(`${req.body.email} is not exist`);

  // Check if pass is valid
  const isPassValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPassValid) return res.status(400).send("password is invalid");

  // User Payload
  const payload = { user: user.id };

  // Generate access & refresh tokens
  const access_token = generateToken(payload, "access");
  const refresh_token = generateToken(payload, "refresh");

  return res.status(200).send({ access_token, refresh_token });
};

module.exports = login;
