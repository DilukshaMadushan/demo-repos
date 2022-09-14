const express = require("express");
const {
  getAllCryptoNews_Sentiment,
  createCryptoNews_Sentiment,
  getCryptoNews_SentimentById,
  updateCryptoNews_SentimentById,
  deleteCryptoNews_SentimentById,
} = require("../../Controllers/CryptoNews/cryptoNews_Sentiment");

// const advancedResults = require("../../Middleware/advancedresults");
const searchCoinSentiment = require("../../Middleware/searchCoinSentiment");
// const CryptoNews_Sentiment = require("../../Models/CryptoNews/CryptoNews_Sentiment");

// const { protect, authorize } = require("../Middleware/auth");
const router = express.Router();

router
  .route("/")
  .get(
    searchCoinSentiment({ path: "coin", select: "name" }),
    getAllCryptoNews_Sentiment
  )
  .post(createCryptoNews_Sentiment);

router
  .route("/:id")
  .get(getCryptoNews_SentimentById)
  .put(updateCryptoNews_SentimentById)
  .delete(deleteCryptoNews_SentimentById);

module.exports = router;
