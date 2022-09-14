const SocialFeed = require("../Models/SocialFeed");
const asyncHandler = require("../Middleware/async");
const ErrorResponse = require("../Utils/errorResponse");

//@desc         Get all social feeds
//@route        GET /api/social-feeds
//@access       Public
exports.getAllSocialFeeds = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.searchSocialFeeds);
});

//@desc         Get single social feed
//@route        GET /api/social-feeds/:id
//@access       Public
exports.getSocialFeedById = asyncHandler(async (req, res, next) => {
  const social_feed = await SocialFeed.findById(req.params.id);
  if (!social_feed) {
    return next(
      new ErrorResponse(
        `Social Feed not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: social_feed });
});

//@desc         Create new social feed
//@route        POST /api/social-feeds
//@access       Public
exports.createSocialFeed = asyncHandler(async (req, res, next) => {
  const social_feed = await SocialFeed.create(req.body);
  res.status(201).json({
    success: true,
    data: social_feed,
  });
});

//@desc         Update single social feed
//@route        PUT /api/social-feeds/:id
//@access       Privert
exports.updateSocialFeedById = asyncHandler(async (req, res, next) => {
  const social_feed = await SocialFeed.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!social_feed) {
    return next(
      new ErrorResponse(
        `Social Feed not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: social_feed });
});

//@desc         Delete single social feed
//@route        DELETE /api/social-feeds/:id
//@access       Privert
exports.deleteSocialFeedById = asyncHandler(async (req, res, next) => {
  const social_feed = await SocialFeed.findById(req.params.id);
  if (!social_feed) {
    return next(
      new ErrorResponse(
        `Social Feed not found with id of ${req.params.id}`,
        404
      )
    );
  }

  social_feed.remove();

  res.status(200).json({ success: true, data: {} });
});
