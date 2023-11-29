const jwt = require("jsonwebtoken");

const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;

const { User } = require("../models/users/index");

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, accessToken] = authorization.split(" ");
    if (bearer !== "Bearer") {
      return res.status(401).json("Not authorized");
    }
    if (!accessToken) {
      return res.status(401).json("Not authorized");
    }

    const { id } = jwt.verify(accessToken, JWT_ACCESS_SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json("Not authorized");
  }
};

module.exports = authenticate;
