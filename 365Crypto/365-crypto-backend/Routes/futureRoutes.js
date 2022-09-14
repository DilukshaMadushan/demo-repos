const express = require("express");
const {
  getAllFuture,
  createFuture,
  getFutureById,
  updateFutureById,
  deleteFutureById,
} = require("../Controllers/future");

const advancedResults = require("../Middleware/advancedresults");
const Future = require("../Models/Future");

const router = express.Router();

const { protect, authorize } = require("../Middleware/auth");

router
  .route("/")
  .get(advancedResults(Future, "pair"), getAllFuture)
  .post(protect, authorize("admin"), createFuture);

router
  .route("/:id")
  .get(getFutureById)
  .put(protect, authorize("admin"), updateFutureById)
  .delete(protect, authorize("admin"), deleteFutureById);

module.exports = router;
