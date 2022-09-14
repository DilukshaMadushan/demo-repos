const express = require("express");
const {
  getAllSpot,
  createSpot,
  getSpotById,
  updateSpotById,
  deleteSpotById,
} = require("../Controllers/spot");

const advancedResults = require("../Middleware/advancedresults");
const Spot = require("../Models/Spot");

const router = express.Router();

const { protect, authorize } = require("../Middleware/auth");

router
  .route("/")
  .get(advancedResults(Spot, "pair"), getAllSpot)
  .post(protect, authorize("admin"), createSpot);

router
  .route("/:id")
  .get(getSpotById)
  .put(protect, authorize("admin"), updateSpotById)
  .delete(protect, authorize("admin"), deleteSpotById);

module.exports = router;
