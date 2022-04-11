const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

function auth(req, res, next) {
  let tokenFromCookie = req.cookies["x-auth-token"];
  if (tokenFromCookie) {
    jwt.verify(tokenFromCookie, JWT_SECRET, function (err, decoded) {
      if (err) {
        res.clearCookie("x-auth-token"); //fake cookie/token
      } else {
        req.user = decoded;
      }
    });
  }
  next();
}

function isAuthenticated(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ errorData: "Unauthorized" });
  }
  next();
}

module.exports = {
  auth,
  isAuthenticated,
};
