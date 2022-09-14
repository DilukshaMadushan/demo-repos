const express = require("express");
const {
  getAllSocialFeedTopics,
  getSocialFeedTopicById,
  createSocialFeedTopic,
  updateSocialFeedTopicById,
  deleteSocialFeedTopicById,
} = require("../Controllers/socialFeedTopic");

const advancedresults = require("../Middleware/advancedresults");
const SocialFeedTopic = require("../Models/SocialFeedTopic");

const router = express.Router();

const { protect, authorize } = require("../Middleware/auth");

router
  .route("/")
  .get(advancedresults(SocialFeedTopic, false), getAllSocialFeedTopics)
  .post(protect, authorize("admin"), createSocialFeedTopic);

router
  .route("/:id")
  .get(getSocialFeedTopicById)
  .put(protect, authorize("admin"), updateSocialFeedTopicById)
  .delete(protect, authorize("admin"), deleteSocialFeedTopicById);

module.exports = router;
