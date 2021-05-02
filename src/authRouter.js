const router = require("express").Router();

const { register, login, tokenRefresh } = require("./controllers");
const { isAuthorized } = require("./middleware");

// Creates a new user object and returns it
router.post("/register", register);

// Returns new access [and refresh] token
router.post("/login", login);

// Returns a new access token if refresh token is verified
router.post("/token", tokenRefresh);

// Validates access token in authorization header
router.get("/validate", isAuthorized, (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;
