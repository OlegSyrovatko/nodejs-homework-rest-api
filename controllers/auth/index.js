const { register } = require("./register");
const { login } = require("./login");
const { refreshUser } = require("./refresh");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { updateSubscription } = require("./updateSubscription");
const { updateAvatar } = require("./updateAvatar");
const { verifyEmail } = require("./verifyEmail");
const { resendVerifyEmail } = require("./resendVerifyEmail");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  refreshUser,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
