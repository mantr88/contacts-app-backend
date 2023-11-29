const { Token } = require("../../models/users/index");

const logout = async (req, res, next) => {
  try {
    // const { _id } = req.user;
    const { refreshToken } = req.cookies;
    console.log(refreshToken);
    await Token.deleteOne({ token: refreshToken });

    res.clearCookie("refreshToken");
    res.status(204).json({ message: "No Content" });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
