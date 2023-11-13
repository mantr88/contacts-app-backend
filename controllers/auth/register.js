const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { randomUUID } = require("crypto");
require("dotenv").config();
const { sendEmail, saveToken, generateTokens } = require("../../helpers/index");

const { User } = require("../../models/users/index");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = randomUUID();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    await sendEmail(
      email,
      `${process.env.BASE_URL}/api/users/verify/${verificationToken}`
    );

    const userDTO = {
      id: newUser._id,
      email: newUser.email,
      isVerify: newUser.isVerify,
    };
    const tokens = generateTokens({ ...userDTO });
    await saveToken(userDTO.id, tokens.refreshToken);

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res
      .status(201)
      .json({ user: userDTO, subscription: "starter", ...tokens });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
