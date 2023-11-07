const User = require("../../models/users/index");

const updateSubscription = async (req, res, next) => {
  console.log(req.body);
  console.log(req.user);

  const { _id } = req.user;
  const { subscription } = req.body;
  try {
    if (!req.body) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    console.log(subscription);
    const result = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
