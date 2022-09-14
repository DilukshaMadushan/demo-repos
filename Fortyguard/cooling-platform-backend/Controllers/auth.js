const crypto = require("crypto");
const asyncHandler = require("../Middleware/async");
const sendEmail = require("../Utils/sendEmail");
const ErrorResponse = require("../Utils/errorResponse");
const User = require("../Models/User");

//@desc         Register user
//@route        POST /auth/register
//@access       Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //Generate email verification code (length 6)
  const len = 6;
  let randStr = "";
  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10 + 1);
    randStr += ch;
  }

  const verificationCode = await randStr.slice(0, 6);

  const user = await User.create({
    name,
    email,
    password,
    role,
    isVerified: false,
    verificationCode: verificationCode,
  });

  //Create verification url
  const verificationUrl = `${req.protocol}://domain.com/api/auth/verify/${user._id}`;

  const message = `You are regsiter successfully for FortyGuard.Please verify email by using this code: ${user.verificationCode} \n\nUse this link :${verificationUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "FortyGuard User Verification",
      message: message,
    });
    res.status(200).json({
      success: true,
      userId: user._id,
    });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
});

//@doc          Verify email
//@route        PUT /auth/email-verify
//@access       Privert
exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  const { verificationCode } = req.body;

  //Validate verification code
  if (!verificationCode) {
    return next(new ErrorResponse("Please provide an verification code", 400));
  }

  //Check if verification code matches
  const isMatch = await user.matchVerificationCode(verificationCode);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid verification code", 401));
  }

  const userUpdate = await User.findByIdAndUpdate(
    user._id,
    { isVerified: true, verificationCode },
    {
      new: true,
      runValidators: true,
    }
  );
  sendTokenResponse(userUpdate, 200, res);
});

//@desc         Login user
//@route        POST /auth/login
//@access       Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  //Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credential", 401));
  }

  //Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credential", 401));
  }

  sendTokenResponse(user, 200, res);
});

//@desc         Log user out / clear cookie
//@route        GET /auth/logout
//@access       Privert
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

//@desc         Get current logged in user
//@route        POST /auth/me
//@access       Privert
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc         Update user details
//@route        PUT /auth/update-details
//@access       Privert
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc         Update user password
//@route        PUT /auth/update-password
//@access       Privert
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  //Check the current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password incorrect", 401));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendTokenResponse(user, 200, res);
});

//@desc         Forgot password
//@route        POST /auth/forgot-password
//@access       Privert
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  //Get reset token
  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/auth/reset-password/${resetToken}`;

  const message = `You are recieving this email because you (or someone else) has requested the reset of a password.
                    Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "FortyGuard Password Reset",
      message: message,
    });

    res.status(200).json({ success: true, resetToken: resetToken });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc         Reset password
//@route        PUT /auth/reset-password/:resettoken
//@access       Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("inavalid token", 400));
  }

  //Set reset password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);
});

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token: token,
  });
};
