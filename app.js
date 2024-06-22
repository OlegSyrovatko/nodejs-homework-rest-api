const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const { SESSION_SECRET_WORD, SESSION_KEY, DB_HOST } = process.env;

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: SESSION_SECRET_WORD,
    key: SESSION_KEY,
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 8 * 60 * 60 * 1000,
    },
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: DB_HOST,
      autoRemove: "native",
    }),
  })
);

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use("*", (req, res, next) => {
  res.status(404).json({ message: "Route Not found" });
  next();
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
