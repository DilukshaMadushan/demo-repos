const express = require("express");
const {
  getAllOpenInterestVolumeHistory_15min,
  createOpenInterestVolumeHistory_15min,
  getOpenInterestVolumeHistory_15minById,
  updateOpenInterestVolumeHistory_15minById,
  deleteOpenInterestVolumeHistory_15minById,
} = require("../../Controllers/OpenInterestVolumeHistory/openInterestVolumeHistory_15min");

const advancedResults = require("../../Middleware/advancedresults");
const OpenInterestVolumeHistory_15min = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_15min");

const router = express.Router();

router
  .route("/")
  .get(
    advancedResults(OpenInterestVolumeHistory_15min, false),
    getAllOpenInterestVolumeHistory_15min
  )
  .post(createOpenInterestVolumeHistory_15min);

router
  .route("/:id")
  .get(getOpenInterestVolumeHistory_15minById)
  .put(updateOpenInterestVolumeHistory_15minById)
  .delete(deleteOpenInterestVolumeHistory_15minById);

module.exports = router;
