const { User, Token, Session } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: "" });

  const currentSession = req.session;
  const sessionDeletionResult = await Session.deleteOne({
    _id: currentSession._id,
  });

  if (!user || !sessionDeletionResult) {
    throw HttpError(401, "Not authorized");
  }

  const tokenRefresh = await Token.findOneAndRemove({
    userEmail: user.email,
  });
  if (!tokenRefresh) {
    throw HttpError(401, "User email invalid or unauthorized");
  }

  throw HttpError(204, "No Content");
};

module.exports = {
  logout: ctrlWrapper(logout),
};
