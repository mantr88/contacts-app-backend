const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/users/index");

const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    if (!user.verify) {
      return res.status(401).json({ message: "Email not verified" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
