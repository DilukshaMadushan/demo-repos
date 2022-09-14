const express = require("express");
const {
  getAllOpenInterestVolumeHistory_1min,
  createOpenInterestVolumeHistory_1min,
  getOpenInterestVolumeHistory_1minById,
  updateOpenInterestVolumeHistory_1minById,
  deleteOpenInterestVolumeHistory_1minById,
} = require("../../Controllers/OpenInterestVolumeHistory/openInterestVolumeHistory_1min");

const advancedResults = require("../../Middleware/advancedresults");
const OpenInterestVolumeHistory_1min = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_1min");

const router = express.Router();

router
  .route("/")
  .get(
    advancedResults(OpenInterestVolumeHistory_1min, false),
    getAllOpenInterestVolumeHistory_1min
  )
  .post(createOpenInterestVolumeHistory_1min);

router
  .route("/:id")
  .get(getOpenInterestVolumeHistory_1minById)
  .put(updateOpenInterestVolumeHistory_1minById)
  .delete(deleteOpenInterestVolumeHistory_1minById);

module.exports = router;
