const bcrypt = require("bcrypt");

const { User } = require("../../models/users/index");
const { saveToken, generateTokens } = require("../../helpers/index");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    if (!user.isVerify) {
      return res.status(401).json({ message: "Email not verified" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const userDTO = {
      id: user._id,
      email: user.email,
      isVerify: user.isVerify,
    };

    const tokens = generateTokens({ ...userDTO });
    await saveToken(userDTO.id, tokens.refreshToken);

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({ user: userDTO, subscription: "starter", ...tokens });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
