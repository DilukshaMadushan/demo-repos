const express = require("express");
const {
  getAllOpenInterestVolumeHistory_5min,
  createOpenInterestVolumeHistory_5min,
  getOpenInterestVolumeHistory_5minById,
  updateOpenInterestVolumeHistory_5minById,
  deleteOpenInterestVolumeHistory_5minById,
} = require("../../Controllers/OpenInterestVolumeHistory/openInterestVolumeHistory_5min");

const advancedResults = require("../../Middleware/advancedresults");
const OpenInterestVolumeHistory_5min = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_5min");

const router = express.Router();

router
  .route("/")
  .get(
    advancedResults(OpenInterestVolumeHistory_5min, false),
    getAllOpenInterestVolumeHistory_5min
  )
  .post(createOpenInterestVolumeHistory_5min);

router
  .route("/:id")
  .get(getOpenInterestVolumeHistory_5minById)
  .put(updateOpenInterestVolumeHistory_5minById)
  .delete(deleteOpenInterestVolumeHistory_5minById);

module.exports = router;
