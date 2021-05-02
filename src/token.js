const jwt = require("jsonwebtoken");

function generateToken(payload, type) {
  if (type === "access") {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
  } else if (type === "refresh") {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXIPRES_IN,
    });
  }
}

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
