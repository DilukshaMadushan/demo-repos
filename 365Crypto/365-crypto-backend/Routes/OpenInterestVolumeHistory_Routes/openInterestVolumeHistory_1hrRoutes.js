const express = require("express");
const {
  getAllOpenInterestVolumeHistory_1hr,
  createOpenInterestVolumeHistory_1hr,
  getOpenInterestVolumeHistory_1hrById,
  updateOpenInterestVolumeHistory_1hrById,
  deleteOpenInterestVolumeHistory_1hrById,
} = require("../../Controllers/OpenInterestVolumeHistory/openInterestVolumeHistory_1hr");

const advancedResults = require("../../Middleware/advancedresults");
const OpenInterestVolumeHistory_1hr = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_1hr");

const router = express.Router();

router
  .route("/")
  .get(
    advancedResults(OpenInterestVolumeHistory_1hr, false),
    getAllOpenInterestVolumeHistory_1hr
  )
  .post(createOpenInterestVolumeHistory_1hr);

router
  .route("/:id")
  .get(getOpenInterestVolumeHistory_1hrById)
  .put(updateOpenInterestVolumeHistory_1hrById)
  .delete(deleteOpenInterestVolumeHistory_1hrById);

module.exports = router;
