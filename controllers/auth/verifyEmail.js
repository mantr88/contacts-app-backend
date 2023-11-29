const { User } = require("../../models/users/index");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    console.log(user);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, {
      isVerify: true,
      verificationToken: "",
    });

    return res.status(200).json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
