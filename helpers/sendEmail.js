const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "syrovatkooleg@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const mail = {
//   to: "sirov@ukr.net",
//   from: "syrovatkooleg@meta.ua",
//   subject: "test email",
//   html: "hello from <b>Meta</b>",
// };

const sendEmail = (data) => {
  const mail = { ...data, from: "syrovatkooleg@meta.ua" };
  transport
    .sendMail(mail)
    .then(console.log("send email success"))
    .catch((err) => console.log(err.message));
};

module.exports = sendEmail;
