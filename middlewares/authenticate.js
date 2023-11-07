const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const { User } = require("../models/users/index");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return res.status(401).json("Not authorized");
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user.token) {
      return res.status(401).json("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json("Not authorized");
  }
};

module.exports = authenticate;
