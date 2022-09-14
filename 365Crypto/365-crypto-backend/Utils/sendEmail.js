const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //Gmail Transporter
  // const transporter = nodemailer.createTransport({
  //   service: 'Gmail',
  //   secure: true,
  //   auth: {
  //     user: process.env.GMAIL_EMAIL,
  //     pass: process.env.GMAIL_PASSWORD,
  //   },
  //   tls: {
  //     //required for send emails
  //     rejectUnauthorized: false,
  //   },
  // });

  //SendinBlue Transporter
  let transporterSendinBlue = nodemailer.createTransport({
    service: "SendinBlue", // no need to set host or port etc.
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: options.toEmail,
    to: options.fromEmail,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporterSendinBlue.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
