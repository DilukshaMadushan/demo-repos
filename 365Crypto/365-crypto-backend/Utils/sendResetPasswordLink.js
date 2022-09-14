const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const log = console.log;
const sendResetPasswordLink = async (options) => {
    
  //SendinBlue Transporter
  let transporter = nodemailer.createTransport({
    service: "SendinBlue", // no need to set host or port etc.
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: "express-handlebars",
      viewPath: "./views/PasswordReset",
    })
  );

  let mailOptions = {
    from: "v3digital.testing@gmail.com",
    to: options.email,
    subject: "365Crypto Reset Password",
    template: "index",
    context: {
    
      link: options.resetPasswordUrl,
    },
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return log("Send verification email error", err);
    }
    return log("Verification Email sent!!!");
  });
};

module.exports = sendResetPasswordLink;
