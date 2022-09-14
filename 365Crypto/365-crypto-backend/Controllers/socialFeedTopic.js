const SocialFeedTopic = require("../Models/SocialFeedTopic");
const asyncHandler = require("../Middleware/async");
const ErrorResponse = require("../Utils/errorResponse");
const path = require("path");
var fs = require("fs");

//@desc         Get all social feed topics
//@route        GET /api/social-feed-topics
//@access       Public
exports.getAllSocialFeedTopics = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single social feed topic
//@route        GET /api/social-feed-topics/:id
//@access       Public
exports.getSocialFeedTopicById = asyncHandler(async (req, res, next) => {
  //Get the social feed topic related to requested id
  const social_feed_topic = await SocialFeedTopic.findById(req.params.id);

  //Checking social feed topic exist
  if (!social_feed_topic) {
    return next(
      new ErrorResponse(
        `Social Feed Topic not found with id of ${req.params.id}`,
        404
      )
    );
  }

  //Returns reponse
  res.status(200).json({ success: true, data: social_feed_topic });
});

//@desc         Create new social feed topic
//@route        POST /api/social-feed-topics
//@access       Public
exports.createSocialFeedTopic = asyncHandler(async (req, res, next) => {
  //Create the social_feed_topic
  let social_feed_topic = await SocialFeedTopic.create(req.body);

  //Checking file input
  if (req.files) {
    const file = req.files.image;

    //Make sure the uploaded file is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload a valid image`, 400));
    }

    //Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload a image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }

    //Checking rss feed platform
    if (req.body.platform == "youtube") {
      //Create custom filename
      file.name = `rss_${social_feed_topic._id}${path.parse(file.name).ext}`;

      //Update image path variable
      social_feed_topic.image = `Uploads/RSS_youtubeDp/rss_${
        social_feed_topic._id
      }${path.parse(file.name).ext}`;

      //File path and update database name
      file.mv(
        `${process.env.FILE_UPLOAD_PATH}/Uploads/RSS_youtubeDp/${file.name}`,
        async (err) => {
          if (err) {
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload.`, 500));
          }
        }
      );
    } else {
      //Create custom filename
      file.name = `rss_${social_feed_topic._id}${path.parse(file.name).ext}`;

      //Update image path variable
      social_feed_topic.image = `Uploads/RSS_Coins/rss_${
        social_feed_topic._id
      }${path.parse(file.name).ext}`;

      //File path and update database name
      file.mv(
        `${process.env.FILE_UPLOAD_PATH}/Uploads/RSS_Coins/${file.name}`,
        async (err) => {
          if (err) {
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload.`, 500));
          }
        }
      );
    }

    //Image updated social_feed_topic
    social_feed_topic = await SocialFeedTopic.findByIdAndUpdate(
      social_feed_topic._id,
      social_feed_topic,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  //Returns the response
  res.status(200).json({
    success: true,
    data: social_feed_topic,
  });
});

//@desc         Update single social feed topic
//@route        PUT /api/social-feed-topics/:id
//@access       Privert
exports.updateSocialFeedTopicById = asyncHandler(async (req, res, next) => {
  //Get the social_feed_topic related to requested id
  let social_feed_topic = await SocialFeedTopic.findOne({ _id: req.params.id });

  //Checking social_feed_topic exists
  if (!social_feed_topic) {
    return next(
      new ErrorResponse(
        `SocialFeedTopic not found with id of ${req.params.id}`,
        404
      )
    );
  }

  //Get all the key values of the req.body Object
  const keyValues = Object.keys(req.body);

  //Check and update values through req.body
  await Promise.all(
    keyValues.map((i) => {
      if (req.body[i]) social_feed_topic[i] = req.body[i];
    })
  );

  //Updated social_feed_topic if image updated
  let social_feed_topic_response = await SocialFeedTopic.findByIdAndUpdate(
    social_feed_topic._id,
    social_feed_topic,
    {
      new: true,
      runValidators: true,
    }
  );

  //Checking file input
  if (req.files) {
    const file = req.files.image;

    //Get image file path to remove uploaded image for stop duplicating image
    const file_path = `${process.env.FILE_UPLOAD_PATH}/${social_feed_topic.image}`;

    //Image file remove
    fs.unlinkSync(file_path);

    //Make sure the uploaded file is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload a valid image`, 400));
    }

    //Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload a image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }

    //Checking rss feed platform type
    if (social_feed_topic.platform == "youtube") {
      //Create custom filename
      file.name = `rss_${social_feed_topic._id}${path.parse(file.name).ext}`;

      //Update image path variable
      social_feed_topic.image = `Uploads/RSS_youtubeDp/rss_${
        social_feed_topic._id
      }${path.parse(file.name).ext}`;

      //File path and update database name
      file.mv(
        `${process.env.FILE_UPLOAD_PATH}/Uploads/RSS_youtubeDp/${file.name}`,
        async (err) => {
          if (err) {
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload.`, 500));
          }
        }
      );
    } else {
      //Create custom filename
      file.name = `rss_${social_feed_topic._id}${path.parse(file.name).ext}`;

      //Update image path variable
      social_feed_topic.image = `Uploads/RSS_Coins/rss_${
        social_feed_topic._id
      }${path.parse(file.name).ext}`;

      //File path and update database name
      file.mv(
        `${process.env.FILE_UPLOAD_PATH}/Uploads/RSS_Coins/${file.name}`,
        async (err) => {
          if (err) {
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload.`, 500));
          }
        }
      );
    }
    //Updated social_feed_topic if image updated
    social_feed_topic_response = await SocialFeedTopic.findByIdAndUpdate(
      social_feed_topic._id,
      social_feed_topic,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  //Returns the response
  res.status(200).json({
    success: true,
    data: social_feed_topic_response,
  });
});

//@desc         Delete single social feed topics
//@route        DELETE /api/social-feed-topics/:id
//@access       Privert
exports.deleteSocialFeedTopicById = asyncHandler(async (req, res, next) => {
  //Get the social_feed_topic related to requested id
  const social_feed_topic = await SocialFeedTopic.findById(req.params.id);

  //Checking social_feed_topic exist
  if (!social_feed_topic) {
    return next(
      new ErrorResponse(
        `SocialFeedTopic not found with id of ${req.params.id}`,
        404
      )
    );
  }

  //Image file path
  const file_path = `${process.env.FILE_UPLOAD_PATH}/${social_feed_topic.image}`;

  //Image file remove
  fs.unlinkSync(file_path);

  //Remove DB object
  social_feed_topic.remove();

  //Returns the response
  res.status(200).json({ success: true, data: {} });
});
