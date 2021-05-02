const { registerValidation } = require("../validation");
const User = require("../userModel");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  // Validate request body
  const { error } = registerValidation.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user exist with that email in DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email is already in use");

  // Hash password
  const hashedPass = bcrypt.hashSync(req.body.password, 10);

  // Create UserModel
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPass,
  });

  try {
    const savedUser = await user.save();
    const createdUser = {
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
    };
    return res.status(201).send(createdUser);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = register;
