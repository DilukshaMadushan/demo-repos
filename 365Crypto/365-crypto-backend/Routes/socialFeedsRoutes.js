const express = require("express");
const {
  getAllSocialFeeds,
  createSocialFeed,
  getSocialFeedById,
  updateSocialFeedById,
  deleteSocialFeedById,
} = require("../Controllers/socialFeed");

const searchSocialFeeds = require("../Middleware/searchSocialFeeds");
const SocialFeed = require("../Models/SocialFeed");

const router = express.Router();

const { protect, authorize } = require("../Middleware/auth");

router
  .route("/")
  .get(searchSocialFeeds(SocialFeed, "coins topicId"), getAllSocialFeeds)
  .post(protect, authorize("admin"), createSocialFeed);

router
  .route("/:id")
  .get(getSocialFeedById)
  .put(protect, authorize("admin"), updateSocialFeedById)
  .delete(protect, authorize("admin"), deleteSocialFeedById);

module.exports = router;
