const express = require("express");
const {
  getAllPair,
  createPair,
  getPairById,
  updatePairById,
  deletePairById,
} = require("../Controllers/pair");

const advancedResults = require("../Middleware/advancedresults");
const Pair = require("../Models/Pair");

const router = express.Router();

const { protect, authorize } = require("../Middleware/auth");

router
  .route("/")
  .get(advancedResults(Pair, "exchange"), getAllPair)
  .post(protect, authorize("admin"), createPair);

router
  .route("/:id")
  .get(getPairById)
  .put(protect, authorize("admin"), updatePairById)
  .delete(protect, authorize("admin"), deletePairById);

module.exports = router;
