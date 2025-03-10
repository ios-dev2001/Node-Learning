const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = decode.UserInfo.username;
    req.roles = decode.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
