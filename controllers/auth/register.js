const { User } = require("../../models/user");
const { HttpError, ctrlWrapper, sendGreed } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatarUrl,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}" > Click to verify email</a>`,
  };

  await sendGreed(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: "starter",
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
