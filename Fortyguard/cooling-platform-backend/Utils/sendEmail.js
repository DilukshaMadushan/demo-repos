const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //Gmail Transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
    tls: {
      //required for send emails
      rejectUnauthorized: false,
    },
  });

  const message = {
    from: process.env.GMAIL_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
