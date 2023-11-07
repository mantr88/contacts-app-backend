const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { randomUUID } = require("crypto");
require("dotenv").config();
const { sendEmail } = require("../../helpers/index");

const User = require("../../models/users/index");

const BASE_URL = process.env.BASE_URL;

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

    const verifyEmail = {
      to: "padre12@gmail.com",
      subject: "Verify email",
      html: `<a target="_blanc" href="${BASE_URL}/api/users/verify/${verificationToken}" >Click verify email</a>`,
      text: "Verify your Email",
    };

    await sendEmail(verifyEmail);

    return res
      .status(201)
      .json({ email: newUser.email, subscription: "starter" });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
