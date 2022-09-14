const CryptoNews_Sentiment = require("../../Models/CryptoNews/CryptoNews_Sentiment");
// const CryptoNews_Coins = require("../../Models/CryptoNews/CryptoNews_Coins");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all crypto news
//@route        GET /api/crypto-news
//@access       Public
exports.getAllCryptoNews_Sentiment = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.searchCoinSentiment);
});

//@desc         Get single Crypto News
//@route        GET /api/crypto-news/:id
//@access       Public
exports.getCryptoNews_SentimentById = asyncHandler(async (req, res, next) => {
  const cryptoNews_Sentiment = await CryptoNews_Sentiment.findById(
    req.params.id
  );

  if (!cryptoNews_Sentiment) {
    return next(
      new ErrorResponse(
        `Crypto News Sentiment not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: cryptoNews_Sentiment });
});

//@desc         Create new Crypto News
//@route        POST /api/crypto-news
//@access       Public
exports.createCryptoNews_Sentiment = asyncHandler(async (req, res, next) => {
  const cryptoNews_Sentiment = await CryptoNews_Sentiment.create(req.body);
  res.status(201).json({
    success: true,
    data: cryptoNews_Sentiment,
  });
});

//@desc         Update single Crypto News_Sentiment
//@route        PUT /api/crypto-news_Sentiment/:id
//@access       Privert
exports.updateCryptoNews_SentimentById = asyncHandler(
  async (req, res, next) => {
    const cryptoNews_Sentiment = await CryptoNews_Sentiment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!cryptoNews_Sentiment) {
      return next(
        new ErrorResponse(
          `Crypto News_Sentiment not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res.status(200).json({ success: true, data: cryptoNews_Sentiment });
  }
);

//@desc         Delete single Crypto News_Sentiment
//@route        DELETE /api/crypto-news_Sentiment/:id
//@access       Privert
exports.deleteCryptoNews_SentimentById = asyncHandler(
  async (req, res, next) => {
    const cryptoNews_Sentiment = await CryptoNews_Sentiment.findById(
      req.params.id
    );
    if (!cryptoNews_Sentiment) {
      return next(
        new ErrorResponse(
          `Crypto News_Sentiment not found with id of ${req.params.id}`,
          404
        )
      );
    }

    cryptoNews_Sentiment.remove();

    res.status(200).json({ success: true, data: {} });
  }
);
