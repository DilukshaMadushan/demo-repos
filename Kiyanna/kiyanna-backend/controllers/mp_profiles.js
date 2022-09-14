const Profile = require('../models/MP_Profile');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const fileupload = require('express-fileupload');
const path = require('path');
const fs = require('fs-extra');
const User_Profile = require('../models/User_Profile');
const MP_Profile = require('../models/MP_Profile');
const User = require('../models/User');
const Idea = require('../models/Idea');
const MP_Rating = require('../models/MP_Rating');
const { use } = require('../routes/ideas');
const { find } = require('../models/MP_Profile');

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

  (await Profile.find({})).forEach(function (doc) {
    Profile.updateMany(
      { _id: doc._id },
      { $set: { isRate: false, isFollow: false } },
      {
        new: true,
        runValidation: true,
      }
    )
      .then((result) => {
        console.log('Updated');
      })
      .catch((err) => {});
  });

  // Finding Profile
  query = Profile.find(JSON.parse(queryStr))
    .populate({
      path: 'ideas',
      options: {
        limit: 1,
        sort: { averageRating: -1 },
      },
      match: { isApproved: true },
      populate: {
        path: 'user',
        select: 'name profilePic_URL anonymous',
      },
      select: 'idea mp_profile',
    })
    .select('-rateBy')
    .select('-followBy');

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-averageRating');
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Profile.countDocuments();

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
  const ideaCount = await Idea.find();
  const no_users = await User.find({ role: 'user' });

  return res.status(200).json({
    success: true,
    count: results.length,
    ideaCount: ideaCount.length,
    data: results,
    users: no_users.length,
    mp_profiles: no_profile.length,
  });
});

//@desc         Get all posts for loggedIn user
//@route        GET /api/v1/teledramas/userloggedin
//@access       public
exports.getLoggedInProfiles = asyncHandler(async (req, res, next) => {
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
  const skip_num = req.query.page * 25 - 25;

  const dummy = (await Profile.find({}).limit(25).skip(skip_num)).forEach(
    function (doc) {
      if (doc.rateBy.includes(req.user.id)) {
        Profile.updateMany(
          { _id: doc._id },
          { $set: { isRate: true } },
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
        Profile.updateMany(
          { _id: doc._id },
          { $set: { isRate: false } },
          {
            new: true,
            runValidation: true,
          }
        )
          .then((result) => {
            console.log('True');
          })
          .catch((err) => {});
      }
    }
  );

  const dummy2 = (await Profile.find({}).limit(25).skip(skip_num)).forEach(
    function (doc) {
      if (doc.followBy.includes(req.user.id)) {
        Profile.updateMany(
          { _id: doc._id },
          { $set: { isFollow: true } },
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
        Profile.updateMany(
          { _id: doc._id },
          { $set: { isFollow: false } },
          {
            new: true,
            runValidation: true,
          }
        )
          .then((result) => {
            console.log('True');
          })
          .catch((err) => {});
      }
    }
  );
  const ideaCount = await Idea.find();

  // Finding Resource
  query = Profile.find(JSON.parse(queryStr))
    .populate({
      path: 'ideas',
      options: {
        limit: 1,
        sort: { averageRating: -1 },
      },
      match: { isApproved: true },
      populate: {
        path: 'user',
        select: 'name profilePic_URL anonymous',
      },
      select: 'idea mp_profile',
    })
    .select('-rateBy')
    .select('-followBy');

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-averageRating');
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Profile.countDocuments();

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

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  return res.status(200).json({
    success: true,
    count: results.length,
    ideaCount: ideaCount.length,
    user: user_details,
    data: results,
    users: no_users.length,
    mp_profiles: no_profile.length,
  });
});

//@desc         Get all movies for loggedIn user
//@route        GET /api/v1/movies/userloggedin
//@access       public
exports.search = asyncHandler(async (req, res, next) => {
  (await Profile.find({})).forEach(function (doc) {
    Profile.updateMany(
      { _id: doc._id },
      { $set: { isRate: false, isFollow: false } },
      {
        new: true,
        runValidation: true,
      }
    )
      .then((result) => {
        console.log('Updated');
      })
      .catch((err) => {});
  });

  Profile.search(req.query.search, function (err, data) {
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  });
});

//@desc         Get all movies for loggedIn user
//@route        GET /api/v1/movies/userloggedin
//@access       public
exports.signInsearch = asyncHandler(async (req, res, next) => {
  (await Profile.find({})).forEach(function (doc) {
    if (doc.rateBy.includes(req.user.id)) {
      Profile.updateMany(
        { _id: doc._id },
        { $set: { isRate: true } },
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
      Profile.updateMany(
        { _id: doc._id },
        { $set: { isRate: false } },
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

    if (doc.followBy.includes(req.user.id)) {
      Profile.updateMany(
        { _id: doc._id },
        { $set: { isFollow: true } },
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
      Profile.updateMany(
        { _id: doc._id },
        { $set: { isFollow: false } },
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

  Profile.search(req.query.search, function (err, data) {
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  });
});

//@desc         Get all Games for loggedIn user
//@route        GET /api/v1/Games/userloggedin
//@access       public
exports.searchOptimize = asyncHandler(async (req, res, next) => {
  let searchResults = await MP_Profile.find({
    name: {
      $regex: `(s+${req.query.name}|^${req.query.name})`,
      $options: 'i',
    },
  })
    .select('name')
    .limit(10);
  return res.status(200).json({
    success: true,
    count: searchResults.length,
    data: searchResults,
  });
});

/**
 * ---------------------Single Profile------------------------------
 */
//@desc         Get single profile
//@route        GET/api/v1/profiles/:id
//@access       public
exports.getProfile = asyncHandler(async (req, res, next) => {
  (await Profile.find({})).forEach(function (doc) {
    Profile.updateMany(
      { _id: doc._id },
      { $set: { isRate: false, isFollow: false } },
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

  const profile = await Profile.findById(req.params.id)
    .populate({
      path: 'ideas',
      options: {
        sort: { likes: -1 },
      },
      match: { isApproved: true },
      populate: { path: 'user', select: 'name profilePic_URL anonymous' },
      select: 'idea likes createdAt',
    })
    .select('-rateBy')
    .select('-followBy');

  if (!profile) {
    return next(
      new ErrorResponse(
        `Profile not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  //--------------- Related Mps---------------------------------\\

  const related_mps = await Profile.find().select(
    'name profilePic averageRating'
  );

  // Shuffle array
  const shuffled = related_mps.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, 3);

  //---------------------------------------------------------\\

  res.status(200).json({
    sucess: true,
    data: profile,
    related_Profiles: selected,
  });
});

//@desc         Get single profile
//@route        GET/api/v1/profiles/:id
//@access       public
exports.getSignInProfile = asyncHandler(async (req, res, next) => {
  (await Idea.find({ mp_profile: req.params.id })).forEach(function (doc) {
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
          console.log('Liked');
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
          console.log('NOLiked');
        })
        .catch((err) => {});
    }
  });

  (await MP_Profile.find({})).forEach(function (doc) {
    if (doc.rateBy.includes(req.user.id)) {
      MP_Profile.updateMany({ _id: doc._id }, { $set: { isRate: true } })
        .then((result) => {
          console.log('True');
        })
        .catch((err) => {});
    } else {
      MP_Profile.updateMany(
        { _id: doc._id },
        { $set: { isRate: false } },
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

  (await Profile.find({})).forEach(function (doc) {
    if (doc.followBy.includes(req.user.id)) {
      Profile.updateMany(
        { _id: doc._id },
        { $set: { isFollow: true } },
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
      Profile.updateMany(
        { _id: doc._id },
        { $set: { isFollow: false } },
        {
          new: true,
          runValidation: true,
        }
      )
        .then((result) => {
          console.log('True');
        })
        .catch((err) => {});
    }
  });

  const profile = await Profile.findById(req.params.id)
    .populate({
      path: 'ideas',
      options: {
        sort: { averageRating: -1 },
      },
      match: { isApproved: true },
      populate: { path: 'user', select: 'name profilePic_URL anonymous' },
      select: 'idea likes isLiked createdAt',
    })
    .select('-rateBy')
    .select('-followBy');

  if (!profile) {
    return next(
      new ErrorResponse(
        `Profile not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  let user_rate = await MP_Rating.findOne({ user: req.user.id }).select(
    'rating'
  );
  if (user_rate === null) {
    user_rate = 0;
  }

  //--------------- Related Mps---------------------------------\\

  const related_mps = await Profile.find().select(
    'name profilePic averageRating'
  );

  // Shuffle array
  const shuffled = related_mps.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, 3);

  //---------------------------------------------------------\\

  res.status(200).json({
    sucess: true,
    data: profile,
    related_Profiles: selected,
    my_rate: user_rate,
  });
});

/**
 * ---------------------------------------------- END OF GET REQUESTS---------------------------------------------------
 */

/**
 * .
 *
 * ----POST REQUESTS---
 * POST CREATE PROFILE
 *
 * .
 */

//@desc         Create new profile
//@route        POST /api/v1/profiles
//@access       Private
exports.createProfile = async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.image;

  // Make sure that the file is a image
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload a valid Image file`, 400));
  }

  const profile = await Profile.create({
    name: req.body.name,
    description: req.body.description,
    link: req.body.link,
    user: req.user.id,
  });

  //Create custom file name
  file.name = `photo_${profile._id}${path.parse(file.name).ext}`;

  file.mv(
    `${process.env.FILE_MP_PROFILEPIC_UPLOAD_PATH}/${file.name}`,
    async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse('Ouch..! Problem with file Upload', 500));
      }

      await Profile.findByIdAndUpdate(profile.id, {
        profilePic: `${process.env.URL_PATH}/uploads/MP_Profile/` + file.name,
      });

      const final_profile = await Profile.find({ _id: profile._id });
      res.status(200).json({
        success: true,
        data: final_profile,
      });
    }
  );
};

/**
 * -------------------------------------------------  END OF POST REQUESTS ------------------------------------------------------------
 */

// /**
//  * .
//  *
//  * ----PUT REQUESTS---
//  * PUT UPDATE PROFILE
//  * PUT UPDATE PROFILE PIC
//  * PUT UPDATE COVER PIC
//  *
//  * .
//  */

//@desc         Update a profile
//@route        PUT /api/v1/profiles/:id
//@access       private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findOne({ _id: req.params.id });

  if (!profile) {
    return next(
      new ErrorResponse(
        `Profile not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure User is profile owner
  if (profile.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not Authorized to update this profile`,
        401
      )
    );
  }

  if (req.body.name) {
    profile.name = req.body.name;
  }

  if (req.body.description) {
    profile.description = req.body.description;
  }

  if (req.files) {
    if (profile.user.toString() !== req.user.id && req.user.role !== 'admin') {
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
    file.name = `photo_${profile._id}${path.parse(file.name).ext}`;

    file.mv(
      `${process.env.FILE_MP_PROFILEPIC_UPLOAD_PATH}/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(
            new ErrorResponse('Ouch..! Problem with file Upload', 500)
          );
        }
        await Profile.findByIdAndUpdate(req.params.id, {
          profilePic: `${process.env.URL_PATH}/uploads/MP_Profile/` + file.name,
        });
      }
    );
  }

  await profile.save();

  res.status(200).json({ success: true, data: profile });
});

//@desc         Update a profile follow
//@route        PUT /api/v1/profiles/:id
//@access       private
exports.updateFollow = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findOne({ _id: req.params.id });

  if (!profile) {
    return next(
      new ErrorResponse(
        `Profile not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  const find_profile = await Profile.findById(req.params.id);
  if (!find_profile.followBy.includes(req.user.id)) {
    const followedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { followCount: +1 },
        $addToSet: { followBy: req.user.id },
        $set: { isFollow: true },
      },
      {
        new: true,
        runValidation: true,
      }
    );
  } else {
    return next(
      new ErrorResponse(`You have already Followed this profile`, 404)
    );
  }

  const final_profile = await Profile.findOne({ _id: req.params.id })
    .select('-rateBy')
    .select('-followBy');
  res.status(200).json({
    success: true,
    data: final_profile,
  });
});

//@desc         Update a profile follow
//@route        PUT /api/v1/profiles/:id
//@access       private
exports.updateUnFollow = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findOne({ _id: req.params.id });

  if (!profile) {
    return next(
      new ErrorResponse(
        `Profile not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  const find_profile = await Profile.findById(req.params.id);
  if (find_profile.followBy.includes(req.user.id)) {
    const followedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { followCount: -1 },
        $pull: { followBy: req.user.id },
        $set: { isFollow: false },
      },
      {
        new: true,
        runValidation: true,
      }
    );
  } else {
    return next(
      new ErrorResponse(`You have already unfollowed this profile`, 404)
    );
  }
  const final_profile = await Profile.findOne({ _id: req.params.id })
    .select('-rateBy')
    .select('-followBy');
  res.status(200).json({
    success: true,
    data: final_profile,
  });
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
  const profile = await Profile.findById(req.params.id);

  if (!profile) {
    return next(
      new ErrorResponse(
        `Profiles not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  // Make sure User is profile owner
  if (profile.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not Authorized to Delete this Profile`,
        401
      )
    );
  }

  profile.remove();
  res.status(200).json({ success: true, data: {} });
});

/**
 * -----------------------------------------------------------  END OF DELETE REQUESTS -------------------------------------------------------------
 */
