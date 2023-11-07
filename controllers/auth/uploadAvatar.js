const path = require("path");
const Jimp = require("jimp");
const User = require("../../models/users/index");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const uploadAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const { path: tempUpload, originalname } = req.file;

    const filename = `${_id}_${originalname}`;

    const resultUpload = path.join(avatarsDir, filename);

    const image = await Jimp.read(tempUpload);
    image.resize(250, 250);
    await image.writeAsync(resultUpload);

    const avatarURl = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURl });

    res.status(201).json({ avatarURl });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadAvatar;
