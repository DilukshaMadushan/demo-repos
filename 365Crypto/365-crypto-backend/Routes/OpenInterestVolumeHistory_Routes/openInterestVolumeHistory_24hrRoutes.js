const express = require("express");
const {
  getAllOpenInterestVolumeHistory_24hr,
  createOpenInterestVolumeHistory_24hr,
  getOpenInterestVolumeHistory_24hrById,
  updateOpenInterestVolumeHistory_24hrById,
  deleteOpenInterestVolumeHistory_24hrById,
} = require("../../Controllers/OpenInterestVolumeHistory/openInterestVolumeHistory_24hr");

const advancedResults = require("../../Middleware/advancedresults");
const OpenInterestVolumeHistory_24hr = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_24hr");

const router = express.Router();

router
  .route("/")
  .get(
    advancedResults(OpenInterestVolumeHistory_24hr, false),
    getAllOpenInterestVolumeHistory_24hr
  )
  .post(createOpenInterestVolumeHistory_24hr);

router
  .route("/:id")
  .get(getOpenInterestVolumeHistory_24hrById)
  .put(updateOpenInterestVolumeHistory_24hrById)
  .delete(deleteOpenInterestVolumeHistory_24hrById);

module.exports = router;
