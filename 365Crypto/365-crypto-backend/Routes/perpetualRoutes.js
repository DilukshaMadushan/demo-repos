const express = require("express");
const {
  getAllPerpetual,
  createPerpetual,
  getPerpetualById,
  updatePerpetualById,
  deletePerpetualById,
} = require("../Controllers/perpetual");

const advancedResults = require("../Middleware/advancedresults");
const Perpetual = require("../Models/Perpetual");

const router = express.Router();

const { protect, authorize } = require("../Middleware/auth");

router
  .route("/")
  .get(advancedResults(Perpetual, "pair"), getAllPerpetual)
  .post(protect, authorize("admin"), createPerpetual);

router
  .route("/:id")
  .get(getPerpetualById)
  .put(protect, authorize("admin"), updatePerpetualById)
  .delete(protect, authorize("admin"), deletePerpetualById);

module.exports = router;
