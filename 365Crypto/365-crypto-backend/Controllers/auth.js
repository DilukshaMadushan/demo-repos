const crypto = require("crypto");
const asyncHandler = require("../Middleware/async");
const sendEmail = require("../Utils/sendEmail");
const sendVerification = require("../Utils/sendVerification");
const sendResetPasswordLink = require("../Utils/sendResetPasswordLink");
const ErrorResponse = require("../Utils/errorResponse");
const User = require("../Models/User");

//@desc         Register user
//@route        POST /auth/register
//@access       Public
exports.register = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, role, isMarketingPromotion } = req.body;

    //Generate email verification code (length 6)
    const len = 6;
    let randStr = "";
    for (let i = 0; i < len; i++) {
      const ch = Math.floor(Math.random() * 10 + 1);
      randStr += ch;
    }

    const verificationCode = randStr.slice(0, 6);

    const resendVerificationExpire = Date.now() + 30 * 60 * 1000;
    const emailVerificationExpire = Date.now() + 30 * 60 * 1000;

    const user = await User.create({
      name,
      email,
      password,
      role,
      isVerified: false,
      isMarketingPromotion,
      verificationCode,
      resendVerificationExpire,
      emailVerificationExpire,
    });

    //Create verification url
    const verificationUrl = `${req.protocol}://365crypto.com/?type=verify&userid=${user._id}&vcode=${verificationCode}`;

    const message = `You are regsiter successfully for Crypto365.Please verify email by using this code: ${user.verificationCode} \n\nUse this link :${verificationUrl}`;

    await sendVerification({
      email: email,

      verificationUrl,
      verificationCode,
    });
    res.status(200).json({
      success: true,
      userId: user._id,
    });
  } catch (err) {
    return next(
      new ErrorResponse(
        "This email is already associated with an account.",
        400
      )
    );
  }
});

//@doc          Verify email
//@route        PUT /auth/email-verify
//@access       Privert
exports.verifyEmail = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

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
  //check for expiration
  user = await User.findOne({
    _id: req.params.id,
    emailVerificationExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Verification code expired", 400));
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
  console.log(req.body);

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

  //Check if the user email is verified
  const isVerified = await user.isVerified;

  if (!isVerified) {
    return next(
      new ErrorResponse("Cannot login, Please Verify your email", 401)
    );
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
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
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
  const resetPasswordUrl = `${req.protocol}://365crypto.com/?type=reset-password&token=${resetToken}`;

  try {
    await sendResetPasswordLink({
      email: req.body.email,
      resetPasswordUrl: resetPasswordUrl,
    });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new ErrorResponse("Reset Password Link could not be sent", 500)
    );
  }

  res.status(200).json({
    success: true,
    data: "Password reset link succesfully send to email",
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

//@desc         Resend Verification Email
//@route        PUT /auth/resend-verification
//@access       Private
exports.resendVerification = asyncHandler(async (req, res, next) => {
  const { userid } = req.body;
  if (!userid) {
    return next(new ErrorResponse("Invalid credentialls", 400));
  }
  const user = await User.findOne({
    _id: userid,
    resendVerificationExpire: { $lt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Please try again later", 400));
  }
  //Generate email verification code (length 6)
  const len = 6;
  let randStr = "";
  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10 + 1);
    randStr += ch;
  }

  const newVerificationCode = randStr.slice(0, 6);
  const newResendVerificationExpire = Date.now() + 30 * 60 * 1000;

  const newEmailVerificationExpire = Date.now() + 30 * 60 * 1000;

  const filter = { _id: userid };
  const update = {
    verificationCode: newVerificationCode,
    resendVerificationExpire: newResendVerificationExpire,
    emailVerificationExpire: newEmailVerificationExpire,
  };

  // `doc` is the document _before_ `update` was applied
  let updatedUser = await User.findOneAndUpdate(filter, update);

  //Create verification url
  const newVerificationUrl = `${req.protocol}://365crypto.com/?type=verify&userid=${updatedUser._id}&vcode=${newVerificationCode}`;

  try {
    await sendVerification({
      email: updatedUser.email,
      verificationUrl: newVerificationUrl,
      verificationCode: newVerificationCode,
    });
    res.status(200).json({
      success: true,
      userId: updatedUser._id,
    });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
});

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  // create Nodebb Token
  const nodebbToken = user.getSignedJwtTokenNodebb();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // sameSite: 'Lax',
    domain: ".365crypto.com",
  };

  if (process.env.NODE_ENV === "production") {
    // options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .cookie("nodebb_token", nodebbToken, options)
    .json({
      success: true,
      token: token,
    });
};
