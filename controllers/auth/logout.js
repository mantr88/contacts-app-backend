const User = require("../../models/users/index");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json({ message: "No Content" });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
