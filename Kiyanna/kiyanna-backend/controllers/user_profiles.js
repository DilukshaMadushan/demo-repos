const User_Profile = require('../models/User_Profile');
const Idea = require('../models/Idea');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const fileupload = require('express-fileupload');
const path = require('path');
const fs = require('fs-extra');
const User = require('../models/User');

/**
 * .
 *
 * ---------------------- GET REQUESTS-----------------------
 * GET PROFILES
 * GET PROFILE
 * GET PROFILE IMAGE RESOURCES
 * GET PROFILE VIDEO RESOURCES
 *
 * .
 */

//@desc         Get all profiles
//@route        GET /api/v1/profiles
//@access       public
exports.getProfiles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single profile
//@route        GET/api/v1/profiles/:id
//@access       public
exports.getProfile = asyncHandler(async (req, res, next) => {
  const profile = await User_Profile.findById(req.params.id);
  user_ideas = await Idea.find({
    user: req.params.id,
    isApproved: true,
  })
    .populate({ path: 'mp_profile', select: 'name profilePic' })
    .select('-likedBy');

  if (!profile) {
    return next(
      new ErrorResponse(
        `Profile not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    sucess: true,
    data: profile,
    ideas: user_ideas,
  });
});

/**
 * ---------------------------------------------- END OF GET REQUESTS---------------------------------------------------
 */

/**
 * .
 *
 * ----PUT REQUESTS---
 * PUT UPDATE PROFILE
 * PUT UPDATE PROFILE PIC
 * PUT UPDATE COVER PIC
 *
 * .
 */

//@desc         Update a profile
//@route        PUT /api/v1/profiles/:id
//@access       private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  let user_profile = await User_Profile.findOne({ _id: req.params.id });
  let user = await User.findOne({ _id: req.params.id });

  if (!user_profile) {
    return next(
      new ErrorResponse(
        `Profile not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure User is bootcamp owner
  if (
    user_profile.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not Authorized to Edit this Profile`,
        401
      )
    );
  }

  if (req.body.name) {
    user_profile.name = req.body.name;
  }

  if (req.body.email) {
    user.email = req.body.email;
  }

  if (req.body.city) {
    user_profile.city = req.body.city;
  }

  if (req.body.anonymous) {
    user_profile.anonymous = req.body.anonymous;
  }

  if (req.body.status) {
    user_profile.status = req.body.status;
  }
  if (req.files) {
    // Make sure User is bootcamp owner
    if (
      user_profile.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.params.id} is not Authorized to upload photo into this Profile`,
          401
        )
      );
    }

    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.image;

    // Make sure that the file is a image
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse(`Please upload a valid Image file`, 400));
    }

    //Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }

    //Create custom file name
    file.name = `photo_${user_profile._id}${path.parse(file.name).ext}`;

    file.mv(
      `${process.env.FILE_USER_PROFILEPIC_UPLOAD_PATH}/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(
            new ErrorResponse('Ouch..! Problem with file Upload', 500)
          );
        }
        await User_Profile.findByIdAndUpdate(req.params.id, {
          profilePic_URL:
            `${process.env.URL_PATH}/uploads/UserProfile/` + file.name,
        });
      }
    );
  }

  await user_profile.save();

  const final_user_profile = await User_Profile.findOne({ _id: req.params.id });

  res.status(200).json({ success: true, data: final_user_profile });
});

/**
 * -----------------------------------------------------  END OF PUT REQUESTS ----------------------------------------------------------
 */

/**
 * .
 *
 * ----DELETE REQUESTS---
 * DELETE PROFILE DELETE
 *
 *
 * .
 */

//@desc         Delete a profile
//@route        PUT /api/v1/profiles/:id
//@access       private
exports.deleteProfile = asyncHandler(async (req, res, next) => {
  const user_profile = await User_Profile.findById(req.params.id);

  if (!user_profile) {
    return next(
      new ErrorResponse(
        `Profiles not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure User is profile owner
  if (
    user_profile.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not Authorized to Delete this Profile`,
        401
      )
    );
  }

  user_profile.remove();
  res.status(200).json({
    success: true,
    Message: 'Profile has successfully Deleted',
    data: {},
  });
});

/**
 * -----------------------------------------------------------  END OF DELETE REQUESTS -------------------------------------------------------------
 */
