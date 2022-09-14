const express = require("express");
const {
  getAllOpenInterestVolumeHistory_12hr,
  createOpenInterestVolumeHistory_12hr,
  getOpenInterestVolumeHistory_12hrById,
  updateOpenInterestVolumeHistory_12hrById,
  deleteOpenInterestVolumeHistory_12hrById,
} = require("../../Controllers/OpenInterestVolumeHistory/openInterestVolumeHistory_12hr");

const advancedResults = require("../../Middleware/advancedresults");
const OpenInterestVolumeHistory_12hr = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_12hr");

const router = express.Router();

router
  .route("/")
  .get(
    advancedResults(OpenInterestVolumeHistory_12hr, false),
    getAllOpenInterestVolumeHistory_12hr
  )
  .post(createOpenInterestVolumeHistory_12hr);

router
  .route("/:id")
  .get(getOpenInterestVolumeHistory_12hrById)
  .put(updateOpenInterestVolumeHistory_12hrById)
  .delete(deleteOpenInterestVolumeHistory_12hrById);

module.exports = router;
