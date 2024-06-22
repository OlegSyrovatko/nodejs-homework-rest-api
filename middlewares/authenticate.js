const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;
const { User, Session } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  // uncomment if bearer === "Bearer" anywhere
  // if (!authenticate) {
  //   next(HttpError(401, "Not authorized"));
  // }
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      next(HttpError(401));
    }
    if (!token) {
      return next(HttpError(401, "No token"));
    }

    const { id, sid } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    const currentSession = await Session.findById(sid);

    if (!user || !user.token || !currentSession || token !== user.token) {
      return next(HttpError(401, "Unauthorized"));
    }

    req.user = user;
    if (currentSession) {
      req.session._id = currentSession._id;
    } else {
      return next(HttpError(401, "Invalid session"));
    }

    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
