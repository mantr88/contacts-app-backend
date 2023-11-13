const nodemailer = require("nodemailer");

const sendEmail = async (to, verificationToken) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Verification email on " + process.env.BASE_URL,
      text: "",
      html: `<div>
      <h1>For verificatio your email please follow the link below</h1>
      <a href="${verificationToken}">${verificationToken}</a>
      </div>`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
