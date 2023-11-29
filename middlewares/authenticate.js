const jwt = require("jsonwebtoken");

const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;

const { User } = require("../models/users/index");

const authenticate = async (req, res, next) => {
  try {
    console.log("0");
    const { authorization = "" } = req.headers;
    console.log(typeof authorization);
    const [bearer, accessToken] = authorization.split(" ");
    console.log(bearer);
    console.log(accessToken);
    if (bearer !== "Bearer") {
      return res.status(401).json("Not authorized");
    }
    console.log("1");
    if (!accessToken) {
      return res.status(401).json("Not authorized");
    }
    console.log("2");

    const { id } = jwt.verify(accessToken, JWT_ACCESS_SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      console.log("3");
      return res.status(401).json("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json("4Not authorized");
  }
};

module.exports = authenticate;
