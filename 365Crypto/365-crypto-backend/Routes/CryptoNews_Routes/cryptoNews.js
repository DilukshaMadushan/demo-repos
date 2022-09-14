const express = require("express");
const {
  getAllCryptoNews,
  createCryptoNews,
  getCryptoNewsById,
  updateCryptoNewsById,
  deleteCryptoNewsById,
} = require("../../Controllers/CryptoNews/cryptoNews");

// const advancedResults = require("../../Middleware/advancedresults");
const searchCryptoNews = require("../../Middleware/searchCryptoNews");
const CryptoNews = require("../../Models/CryptoNews/CryptoNews");

const { protect, authorize } = require("../../Middleware/auth");
const router = express.Router();

router
  .route("/")
  .get(
    searchCryptoNews(CryptoNews, { path: "tickers", select: "symbol" }),
    getAllCryptoNews
  )
  .post(createCryptoNews);

router
  .route("/:id")
  .get(getCryptoNewsById)
  .put(protect, authorize("admin"), updateCryptoNewsById)
  .delete(protect, authorize("admin"), deleteCryptoNewsById);

module.exports = router;
