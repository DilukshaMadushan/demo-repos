const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Profile = require('../models/User_Profile');
const MP_Profile = require('../models/MP_Profile');
const fileupload = require('express-fileupload');
const fs = require('fs');

/**
 * =====================GOOGLE AUTHENTICATION==================================
 */
//@desc         Register User
//@route        POST /api/v1/auth/register/google
//@access       private
exports.registerGoogle = asyncHandler(async (req, res, next) => {
  const { name, googleID, email } = req.body;
  // Find existing User

  const facebook_id = await User.findOne({ email: req.body.email });
  if (facebook_id) {
    const existing_user = await User.findOne({ googleID: req.body.googleID });

    if (existing_user) {
      // Check for user
      const user = await User.findOne({ email });

      //Check for the profile
      const profile = await Profile.findOne({ user })
        .select('name')
        .select('city')
        .select('profilePic_URL');

      sendTokenResponse(profile, existing_user, 200, res);
    } else {
      // Create User
      const user = await User.create({
        name,
        googleID,
        email,
      });

      // Create a profile
      //@desc         Create new profile
      //@route        POST /api/v1/profiles
      //@access       Private
      const profile = await Profile.create({
        name: req.body.name,
        user: user._id.toString(),
        profilePic_URL: req.body.profilePic_URL,
      });
      console.log(req.user.id);
      const find_profile = await MP_Profile.findById(
        '5f44b3fefaf4444051eaa8cc'
      );
      if (!find_profile.followBy.includes(req.user.id)) {
        const followedProfile = await MP_Profile.findByIdAndUpdate(
          '5f44b3fefaf4444051eaa8cc',
          {
            $inc: { followCount: +1 },
            $addToSet: { followBy: req.user.id },
          },
          {
            new: true,
            runValidation: true,
          }
        );
      }

      sendTokenResponse(profile, user, 200, res);
    }
  } else {
    const existing_user = await User.findOne({ googleID: req.body.googleID });

    if (existing_user) {
      // Check for user
      const user = await User.findOne({ email });

      //Check for the profile
      const profile = await Profile.findOne({ user })
        .select('name')
        .select('city')
        .select('profilePic_URL');

      sendTokenResponse(profile, existing_user, 200, res);
    } else {
      // Create User
      const user = await User.create({
        name,
        googleID,
        email,
      });

      // Create a profile
      //@desc         Create new profile
      //@route        POST /api/v1/profiles
      //@access       Private
      const profile = await Profile.create({
        name: req.body.name,
        user: user._id.toString(),
        profilePic_URL: req.body.profilePic_URL,
      });

      const find_profile = await MP_Profile.findById(
        '5f44b3fefaf4444051eaa8cc'
      );
      if (!find_profile.followBy.includes(user._id)) {
        const followedProfile = await MP_Profile.findByIdAndUpdate(
          '5f44b3fefaf4444051eaa8cc',
          {
            $inc: { followCount: +1 },
            $addToSet: { followBy: user._id },
          },
          {
            new: true,
            runValidation: true,
          }
        );
      }
      sendTokenResponse(profile, user, 200, res);
    }
  }
});

//@desc         Register User
//@route        POST /api/v1/auth/register/facebook
//@access       private
exports.registerFacebook = asyncHandler(async (req, res, next) => {
  const { name, facebookID, email } = req.body;

  // Find existing User
  const google_id = await User.findOne({ email: req.body.email });

  if (google_id) {
    const existing_user = await User.findOne({
      facebookID: req.body.facebookID,
    });

    if (existing_user) {
      // Check for user
      const user = await User.findOne({ email });

      //Check for the profile
      const profile = await Profile.findOne({ user })
        .select('name')
        .select('city')
        .select('profilePic_URL');

      sendTokenResponse(profile, existing_user, 200, res);
    } else {
      // Create User
      const user = await User.create({
        name,
        facebookID,
        email,
      });

      // Create a profile
      //@desc         Create new profile
      //@route        POST /api/v1/profiles
      //@access       Private
      const profile = await Profile.create({
        name: req.body.name,
        user: user._id.toString(),
        profilePic_URL: req.body.profilePic_URL,
      });

      // Adding user ID into default profile
      const find_profile = await MP_Profile.findById(
        '5f44b3fefaf4444051eaa8cc'
      );
      if (!find_profile.followBy.includes(user._id)) {
        const followedProfile = await MP_Profile.findByIdAndUpdate(
          '5f44b3fefaf4444051eaa8cc',
          {
            $inc: { followCount: +1 },
            $addToSet: { followBy: user._id },
          },
          {
            new: true,
            runValidation: true,
          }
        );
      }
      sendTokenResponse(profile, user, 200, res);
    }
  } else {
    const existing_user = await User.findOne({
      facebookID: req.body.facebookID,
    });

    if (existing_user) {
      const user = await User.findOne({ email });

      //Check for the profile
      const profile = await Profile.findOne({ user })
        .select('name')
        .select('city')
        .select('profilePic_URL');

      sendTokenResponse(profile, existing_user, 200, res);
    } else {
      // Create User
      const user = await User.create({
        name,
        facebookID,
        email,
      });

      // Create a profile
      //@desc         Create new profile
      //@route        POST /api/v1/profiles
      //@access       Private
      const profile = await Profile.create({
        name: req.body.name,
        user: user._id.toString(),
        profilePic_URL: req.body.profilePic_URL,
      });

      const find_profile = await MP_Profile.findById(
        '5f44b3fefaf4444051eaa8cc'
      );
      if (!find_profile.followBy.includes(user._id)) {
        const followedProfile = await MP_Profile.findByIdAndUpdate(
          '5f44b3fefaf4444051eaa8cc',
          {
            $inc: { followCount: +1 },
            $addToSet: { followBy: user._id },
          },
          {
            new: true,
            runValidation: true,
          }
        );
      }
      sendTokenResponse(profile, user, 200, res);
    }
  }
});

//@desc         Register User
//@route        POST /api/v1/auth/register
//@access       private
exports.register = asyncHandler(async (req, res, next) => {
  const { name, mobile, password, email } = req.body;

  // Check Fields
  if (!req.body.mobile || !req.body.password) {
    return next(new ErrorResponse('Path Mobile and Password is required', 400));
  }

  // Find existing User
  const existing_user = await User.findOne({ mobile: req.body.mobile });
  if (existing_user) {
    return next(new ErrorResponse('Sorry! Mobile number has Registerd', 400));
  } else {
    // Create User
    const user = await User.create({
      name,
      mobile,
      password,
      email,
    });

    // Create a profile
    //@desc         Create new profile
    //@route        POST /api/v1/profiles
    //@access       Private
    const profile = await Profile.create({
      name: req.body.name,
      city: req.body.city,
      user: user._id.toString(),
    });

    const find_profile = await MP_Profile.findById('5f44b3fefaf4444051eaa8cc');
    if (!find_profile.followBy.includes(user._id)) {
      const followedProfile = await MP_Profile.findByIdAndUpdate(
        '5f44b3fefaf4444051eaa8cc',
        {
          $inc: { followCount: +1 },
          $addToSet: { followBy: user._id },
        },
        {
          new: true,
          runValidation: true,
        }
      );
    }
    // Get token from model, create cookie and send respond
    const sendTokenResponseToRegister = (user, stastusCode, res) => {
      const token = user.getSignedJwtToken();

      const options = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

      if (process.env.NODE_ENV === 'production') {
        options.secure = true;
      }

      res.status(stastusCode).cookie('token', token, options).json({
        success: true,
        profile: profile,
        token,
      });
    };

    sendTokenResponseToRegister(user, 200, res);
  }
});

//@desc         Login User
//@route        POST /api/v1/auth/login
//@access       public
exports.login = asyncHandler(async (req, res, next) => {
  const { mobile, password } = req.body;

  //   Validate Email and Password
  if (!mobile || !password) {
    return next(new ErrorResponse('Please provide Mobile and Password', 400));
  }

  // Check for user
  const user = await User.findOne({ mobile }).select('+password');

  //Check for the profile
  const profile = await Profile.findOne({ user })
    .select('name')
    .select('avatar_name')
    .select('profilePic_URL');

  if (!user) {
    return next(new ErrorResponse('Invalid Credential', 401));
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid Credential', 401));
  }

  // Get token from model, create cookie and send respond
  const sendTokenResponseToRegister = (user, stastusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }
    res.status(stastusCode).cookie('token', token, options).json({
      success: true,
      profile: profile,
      token,
    });
  };
  sendTokenResponseToRegister(user, 201, res);
});

//@desc         Get current logged in user
//@route        POST /api/v1/auth/me
//@access       private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc         Update User details
//@route        PUT /api/v1/auth/updatedetails
//@access       private
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

//@desc        Update Password
//@route        PUT /api/v1/auth/updatepassword
//@access       private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current passowrd
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is Incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// Get token from model, create cookie and send respond
const sendTokenResponse = (profile, user, stastusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(stastusCode).cookie('token', token, options).json({
    success: true,
    token,
    profile: profile,
  });
};

//@desc         Forgot password
//@route        POST /api/v1/auth/forgotpassword
//@access       public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get Reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: user,
  });
});
