const express = require("express");
const {
  getAllOpenInterestVolumeHistory_4hr,
  createOpenInterestVolumeHistory_4hr,
  getOpenInterestVolumeHistory_4hrById,
  updateOpenInterestVolumeHistory_4hrById,
  deleteOpenInterestVolumeHistory_4hrById,
} = require("../../Controllers/OpenInterestVolumeHistory/openInterestVolumeHistory_4hr");

const advancedResults = require("../../Middleware/advancedresults");
const OpenInterestVolumeHistory_4hr = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_4hr");

const router = express.Router();

router
  .route("/")
  .get(
    advancedResults(OpenInterestVolumeHistory_4hr, false),
    getAllOpenInterestVolumeHistory_4hr
  )
  .post(createOpenInterestVolumeHistory_4hr);

router
  .route("/:id")
  .get(getOpenInterestVolumeHistory_4hrById)
  .put(updateOpenInterestVolumeHistory_4hrById)
  .delete(deleteOpenInterestVolumeHistory_4hrById);

module.exports = router;
