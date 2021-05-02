/**
 * A middleware that verifies the jwt in authorization header
 * Simplified version of https://www.npmjs.com/package/express-jwt
 * Used in /validate endpoint
 */

const { verifyToken } = require("./token");

function isAuthorized(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).send("authorization header is not provided");

  try {
    const payload = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = payload.user;
    next();
  } catch (err) {
    return res.status(401).send(err);
  }
}

module.exports.isAuthorized = isAuthorized;
