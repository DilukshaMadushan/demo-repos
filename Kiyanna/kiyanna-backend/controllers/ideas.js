const Idea = require('../models/Idea');
const MP_Profile = require('../models/MP_Profile');
const User = require('../models/User');
const User_Profile = require('../models/User_Profile');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');
const fs = require('fs');
const { use } = require('../routes/ideas');

/**
 * .
 * ----GET METHODS---
 * GET COMMENTS
 * GET SINGLE COMMENT
 * GET RESOURCES FOR SPECIFIC PET RESOURCE
 *
 *.
 */
//@desc         Get Ideas
//@route        GET/api/v1/Ideas
//@route        GET/api/v1/mp-profiles/:mp_profileID/ideas
//@access       public
exports.getIdeas = asyncHandler(async (req, res, next) => {
  if (req.params.mp_profileID) {
    const profile = await MP_Profile.findById(req.params.mp_profileID);

    const idea = await Idea.find({
      mp_profile: req.params.mp_profileID,
    });

    if (!profile) {
      return next(
        new ErrorResponse(`No Profile with the id of ${req.params.id}`),
        404
      );
    }

    const no_profile = await MP_Profile.find();

    return res.status(200).json({
      success: true,
      count: idea.length,
      data: idea,
      users: User.length,
      mp_profiles: no_profile.length,
    });
  } else {
    let query;

    //Copy of req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    //Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    //Create query string
    let queryStr = JSON.stringify(reqQuery);

    //Query filtering thourgh URL ($gt, $lte etc..)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    (await Idea.find({})).forEach(function (doc) {
      Idea.updateMany(
        { _id: doc._id },
        { $set: { isLiked: false } },
        {
          new: true,
          runValidation: true,
        }
      )
        .then((result) => {
          console.log('True');
        })
        .catch((err) => {});
    });

    // Finding Profile
    query = Idea.find(JSON.parse(queryStr) && { isApproved: true }).select(
      '-likedBy'
    );

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    query = query.populate({ path: 'mp_profile', select: 'name profilePic' });
    query = query.populate({
      path: 'user',
      select: 'name profilePic_URL anonymous',
    });

    //Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Idea.countDocuments();

    query = query.skip(startIndex).limit(limit);

    //Executing query
    const results = await query;

    //pagination results
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
    const no_users = await User.find({ role: 'user' });
    const no_profile = await MP_Profile.find();

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
      users: no_users.length,
      mp_profiles: no_profile.length,
    });
  }
});

//@desc         Get all posts for loggedIn user
//@route        GET /api/v1/teledramas/userloggedin
//@access       public
exports.getLoggedInIdeas = asyncHandler(async (req, res, next) => {
  let query;

  //Copy of req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  //Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  //Create query string
  let queryStr = JSON.stringify(reqQuery);

  //Query filtering thourgh URL ($gt, $lte etc..)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  followed_mp_ids = [];
  const followed_mp = await MP_Profile.find({
    followBy: { $in: [req.user.id] },
  });

  for (var i = 0; i < followed_mp.length; i++) {
    followed_mp_ids.push(followed_mp[i].id);
  }

  console.log(followed_mp_ids);
  const isFollowedMp = await MP_Profile.find();

  const skip_num = req.query.page * 25 - 25;

  const dummy = (
    await Idea.find({}).sort('-createdAt').limit(25).skip(skip_num)
  ).forEach(function (doc) {
    if (doc.likedBy.includes(req.user.id)) {
      Idea.updateMany(
        { _id: doc._id },
        { $set: { isLiked: true } },
        {
          new: true,
          runValidation: true,
        }
      )
        .then((result) => {
          console.log('True');
        })
        .catch((err) => {});
    } else {
      Idea.updateMany(
        { _id: doc._id },
        { $set: { isLiked: false } },
        {
          new: true,
          runValidation: true,
        }
      )
        .then((result) => {
          console.log('False');
        })
        .catch((err) => {});
    }
  });

  console.log(skip_num);

  // Finding Profile
  query = Idea.find(
    JSON.parse(queryStr) && { isApproved: true } && {
        mp_profile: { $in: followed_mp_ids },
      }
  ).select('-likedBy');

  // const query2 = await Idea.find({
  //   mp_profile: { $in: followed_mp_ids },
  // });

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  query = query.populate({ path: 'mp_profile', select: 'name profilePic' });
  query = query.populate({
    path: 'user',
    select: 'name profilePic_URL anonymous',
  });

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Idea.countDocuments();

  query = query.skip(startIndex).limit(limit);

  //Executing query
  const results = await query;

  //pagination results
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  const no_profile = await MP_Profile.find();
  const no_users = await User.find({ role: 'user' });
  const user_details = await User_Profile.findOne({ user: req.user.id })
    .select('name')
    .select('profilePic_URL')
    .select('anonymous');

  return res.status(200).json({
    success: true,
    count: total,
    followed_mp: followed_mp.length,
    user: user_details,
    data: results,
    users: no_users.length,
    mp_profiles: no_profile.length,
  });
});

// ========================================
// ................LIKE ...................
// =========================================

//@desc         Update single Like Votes
//@route        PUT/api/v1/resources/:id/like
//@access       public
exports.updateLike = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  let idea = await Idea.findById(req.params.id);

  if (!idea) {
    return next(
      new ErrorResponse(`No Idea with the id of ${req.params.id}`),
      404
    );
  }

  if (idea.likedBy.includes(req.user.id)) {
    return next(new ErrorResponse(`You have Already Liked for this idea`), 404);
  }

  idea = await Idea.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: +1 }, $addToSet: { likedBy: req.user.id }, isLiked: true },
    {
      new: true,
      runValidation: true,
    }
  );

  res.status(200).json({
    success: true,
    data: idea,
  });
});

//@desc         Update single Unlike Votes
//@route        PUT/api/v1/resources/:id/unlike
//@access       public
exports.updateUnlike = asyncHandler(async (req, res, next) => {
  let idea = await Idea.findById(req.params.id);

  if (!idea) {
    return next(
      new ErrorResponse(`No Idea with the id of ${req.params.id}`),
      404
    );
  }

  if (!idea.likedBy.includes(req.user.id)) {
    return next(
      new ErrorResponse(
        `The User with ID ${req.user.id} has already Unliked`,
        400
      )
    );
  }

  idea = await Idea.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: -1 }, $pull: { likedBy: req.user.id }, isLiked: false },
    {
      new: true,
      runValidation: true,
    }
  );

  res.status(200).json({
    success: true,
    data: idea,
  });
});
/**
 *
 *
 *
 *
 *
 *
 *
 */

// ================================= FOR ADMIN ================================================

//@desc         Get Ideas
//@route        GET/api/v1/Ideas
//@route        GET/api/v1/mp-profiles/:mp_profileID/ideas
//@access       public
exports.getIdeasForAdmin = asyncHandler(async (req, res, next) => {
  if (req.params.mp_profileID) {
    const profile = await MP_Profile.findById(req.params.mp_profileID);

    const idea = await Idea.find({
      mp_profile: req.params.mp_profileID,
    });

    if (!profile) {
      return next(
        new ErrorResponse(`No Profile with the id of ${req.params.id}`),
        404
      );
    }

    return res.status(200).json({
      success: true,
      count: idea.length,
      data: idea,
      users: User.length,
      ideas: Idea.length,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
// =============================================================================================

//@desc         Get single Idea
//@route        GET/api/v1/Idea/:id
//@access       public
exports.getIdea = asyncHandler(async (req, res, next) => {
  const idea = await Idea.findById(req.params.id);

  if (!idea) {
    return next(
      new ErrorResponse(`No Idea with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: idea,
  });
});

// ================================================ END OF GET REQUESTS ====================================================

/**
 * .
 * ----POST REQUESTS----
 * POST ADD COMMENT
 *
 *
 *.
 */

//@desc         Add single Idea
//@route        POST/api/v1/resources/:resourceId/Ideas
//@access       Private
exports.addIdea = asyncHandler(async (req, res, next) => {
  req.body.mp_profile = req.params.profileId;
  req.body.user = req.user.id;

  const profile = await MP_Profile.findById(req.params.profileId);

  const user_profile = await User.findOne({ user: req.user.id })
    .select('name')
    .select('profilePic_URL');

  if (!profile) {
    return next(
      new ErrorResponse(`No MP with the id of ${req.params.profileId}`),
      404
    );
  }

  const user_original = await User_Profile.findOne({ user: req.user.id });

  // console.log(user_original.user);
  const idea = await Idea.create({
    idea: req.body.idea,
    mp_profile: req.params.profileId,
    user: user_original.id,
  });

  const new_idea = await Idea.find({ _id: idea._id });
  const mpProfile = await MP_Profile.findOne({ id: req.params.id }).select(
    'name'
  );

  res.status(201).json({
    success: true,
    data: new_idea,
    mpProfile,
    userName: user_original.name,
  });
});

// ================================================ END OF POST REQUESTS ====================================================
/**
 * .
 * ---- PUT REQUESTS ----
 * PUT EDIT IDEA BY ADMIN
 *
 *
 *
 *.
 */

//@desc         Update single Comment
//@route        PUT/api/v1/comment/:id
//@access       Private
exports.updateIdea = asyncHandler(async (req, res, next) => {
  let idea = await Idea.findById(req.params.id);

  if (!idea) {
    return next(
      new ErrorResponse(`No Idea with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure User is Comment owner
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.name} is not Authorized to update '${idea.id}' `,
        401
      )
    );
  }

  idea = await Idea.findByIdAndUpdate(
    req.params.id,
    {
      isApproved: req.body.approve,
    },
    {
      new: true,
      runValidation: true,
    }
  );

  res.status(200).json({
    success: true,
    data: idea,
  });
});

/**
 * .
 * ----DELETE REQUESTS----
 * DELETE COMMENT
 * DELETE REPLY [BY UPDATE ARRAY]
 *
 *
 *.
 */

//@desc         Delete single Idea
//@route        DELETE/api/v1/ideas/:id
//@access       Private
exports.deleteIdea = asyncHandler(async (req, res, next) => {
  const idea = await Idea.findById(req.params.id);

  if (!idea) {
    return next(
      new ErrorResponse(`No Idea with the id of ${req.params.id}`),
      404
    );
  }
  // Make sure User is comment owner
  if (idea.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.name} is not Authorized to Delete this Idea`,
        401
      )
    );
  }

  await idea.remove();

  res.status(200).json({
    success: true,
    message: 'Your Idea has successfully Deleted',
    data: {},
  });
});

// ================================================ END OF DELETE REQUESTS ====================================================
