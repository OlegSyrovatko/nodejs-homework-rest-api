const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendGreed = (data) => {
  const email = { ...data, from: "sirov@ukr.net" };
  sgMail
    .send(email)
    .then(console.log("email send success"))
    .catch((err) => console.log(err.message));
};

module.exports = sendGreed;
