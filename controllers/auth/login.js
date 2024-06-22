const { User, Token, Session } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email is not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const userInTokensCollection = await Token.findOne({ email: email });
  if (userInTokensCollection) {
    await Token.findOneAndRemove({ email: email });
  }

  const newSession = await Session.create({
    uid: user._id,
  });

  const payload = {
    id: user._id,
    sid: newSession._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const tokenRefresh = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "23d",
  });

  await User.findByIdAndUpdate(user._id, { token });
  await Token.create({
    email: user.email,
    tokenRefresh,
  });

  res.json({
    code: 200,
    message: "User login success",
    token,
    tokenRefresh,
    user: {
      name: user.name,
      subscription: "starter",
    },
  });
};

module.exports = {
  login: ctrlWrapper(login),
};
