const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");

const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../public", "avatars");

// const avatarsDir = __dirname.split("/").slice(0, -2).join("/") + "/public/avatars";
// const avatarsDir = __dirname + "../../public/avatars";

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const resultUpload = path.join(avatarsDir, originalname);
    // const resultUpload = avatarsDir + "/" + originalname;
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("../../public", "avatars", originalname);
    // const avatarURL = "../../public/avatars/" + originalname;
    await User.findByIdAndUpdate(_id, { avatarURL });
    return res.status(200).json(avatarURL);

};


// const { User } = require("../../models/user");
// const { HttpError, ctrlWrapper } = require("../../helpers");

// const updateAvatar = async (req, res) => {
//   const { subscription = "starter" } = req.body;
//   const { _id } = req.user;
//   const data = await User.findByIdAndUpdate(
//     _id,
//     { subscription },
//     { new: true }
//   );

//   if (!data) {
//     throw HttpError(404, "Not found");
//   }
//   return res.status(200).json(data);
// };




module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
  // updateAvatar
};
