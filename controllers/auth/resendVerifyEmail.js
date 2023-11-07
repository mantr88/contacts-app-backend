const { User } = require("../../models/users/index");
const { sendEmail } = require("../../helpers/index");
const BASE_URL = process.env.BASE_URL;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  const user = await User.findOne({ email });

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blanc" href="${BASE_URL}/api/users/verify/${user.verificationToken}" >Click verify email</a>`,
    text: "Verify your Email",
  };

  await sendEmail(verifyEmail);

  return res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
