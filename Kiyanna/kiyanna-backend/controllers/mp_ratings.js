const MP_Rating = require('../models/MP_Rating');
const MP_Profile = require('../models/MP_Profile');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      Get ratings
// @route     GET /api/v1/ratings
// @route     GET /api/v1/posts/:postId/ratings
// @access    Public
exports.getRatings = asyncHandler(async (req, res, next) => {
  if (req.params.profileId) {
    const ratings = await MP_Rating.find({ mp_profile: req.params.profileId });

    return res.status(200).json({
      success: true,
      count: ratings.length,
      data: ratings,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//@desc         Get a single Rating
//@route        GET/api/v1/ratings/:id
//@access       public
exports.getRating = asyncHandler(async (req, res, next) => {
  const rating = await MP_Rating.findById(req.params.id);

  if (!rating) {
    return next(
      new ErrorResponse(`No Rating found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: rating,
  });
});

//@desc         Add a single Ratings
//@route        POST/api/v1/posts/postId/ratings
//@access       private
exports.addRating = asyncHandler(async (req, res, next) => {
  req.body.mp_profile = req.params.profileId;
  req.body.user = req.user.id;

  const profile = await MP_Profile.findById(req.params.profileId);

  if (!profile) {
    return next(
      new ErrorResponse(`No Profile with the id ${req.params.profileId}`, 404)
    );
  }

  // Increse the rate Count By 1

  const find_profile = await MP_Profile.findById(req.params.profileId);
  if (!find_profile.rateBy.includes(req.user.id)) {
    await MP_Profile.findByIdAndUpdate(
      req.params.profileId,
      {
        $inc: { rateCount: +1 },
        $addToSet: { rateBy: req.user.id },
        $set: { isRate: true },
      },
      {
        new: true,
        runValidation: true,
      }
    );
  }

  const rating = await MP_Rating.create(req.body);

  res.status(200).json({
    success: true,
    data: rating,
  });
});

//@desc         Delete a single Rating
//@route        DELETE/api/v1/ratings/:id
//@access       private
exports.deleteRating = asyncHandler(async (req, res, next) => {
  const rating = await MP_Rating.findById(req.params.id);

  if (!rating) {
    return next(
      new ErrorResponse(`No Rating with the id ${req.params.id}`, 404)
    );
  }

  // Make sure review is belong to user or user is admin
  if (rating.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not Authorize to Delete this Rating`, 401));
  }

  // Deleting teledrama post rating and pull the id and decrese rate by 1
  const find_profile = await MP_Profile.findOne({ _id: rating.mp_profile });
  if (find_profile.rateBy.includes(req.user.id)) {
    await MP_Profile.findByIdAndUpdate(
      rating.mp_profile,
      {
        $inc: { rateCount: -1 },
        $pull: { rateBy: req.user.id },
        $set: { isRate: false },
      },
      {
        new: true,
        runValidation: true,
      }
    );
  }

  await rating.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
