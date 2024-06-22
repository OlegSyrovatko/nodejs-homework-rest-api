const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const tokenRefreshSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "userId field, must be filled in correctly"],
    },
    tokenRefresh: {
      type: String,
      required: [true, "tokenRefresh field, must be filled in correctly"],
    },
  },
  { versionKey: false, timestamps: true }
);
tokenRefreshSchema.post("save", handleMongooseError);

const Token = model("token", tokenRefreshSchema);

const refreshSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  tokenRefresh: Joi.string().required(),
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    avatarURL: {
      type: String,
      required: [true, "avatar is required"],
      unique: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const updateSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const sessionSchema = new Schema({
  uid: mongoose.Types.ObjectId,
});
const Session = mongoose.model("Session", sessionSchema);

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscription,
  emailSchema,
  refreshSchema,
};

const User = model("user", userSchema);

module.exports = {
  Token,
  User,
  Session,
  schemas,
};
