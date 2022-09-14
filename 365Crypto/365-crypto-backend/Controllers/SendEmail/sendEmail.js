const sendEmail = require('../../Utils/sendEmail');
const asyncHandler = require('../../Middleware/async');
//@desc         Send A Email
//@route        POST /api/send-email
//@access       Public
exports.sendEmail = asyncHandler(async (req, res, next) => {
  const { toEmail,fromEmail, subject, message } = req.body;
  try {
    await sendEmail({
      fromEmail: fromEmail,
      toEmail:  toEmail,
      subject: subject,
      message: message,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});
