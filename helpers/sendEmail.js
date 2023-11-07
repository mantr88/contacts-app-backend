const nodemailer = require("nodemailer");

require("dotenv").config();

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "anton@mail.com" };
    await transport
      .sendMail(email)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    return true;
  } catch (error) {}
};

module.exports = sendEmail;
