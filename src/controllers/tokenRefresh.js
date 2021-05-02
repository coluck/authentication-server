const { generateToken, verifyToken } = require("../token");

const tokenRefresh = async (req, res) => {
  const refreshToken = req.body.refresh_token;
  // TODO: check refresh is in DB or Redis or whatever

  if (!refreshToken) return res.status(401).send("refresh token not provided");
  try {
    const payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const access_token = generateToken({ user: payload.user }, "access");
    return res.status(200).send({ access_token });
  } catch (err) {
    return res.status(403).send(err);
  }
};
module.exports = tokenRefresh;
