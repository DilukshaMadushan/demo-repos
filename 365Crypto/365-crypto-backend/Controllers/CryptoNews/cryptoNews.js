const CryptoNews = require("../../Models/CryptoNews/CryptoNews");
// const CryptoNews_Coins = require("../../Models/CryptoNews/CryptoNews_Coins");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all crypto news
//@route        GET /api/crypto-news
//@access       Public
exports.getAllCryptoNews = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.searchCryptoNews);
});

//@desc         Get single Crypto News
//@route        GET /api/crypto-news/:id
//@access       Public
exports.getCryptoNewsById = asyncHandler(async (req, res, next) => {

  const cryptoNews = await CryptoNews.findById(req.params.id);
 
  if (!cryptoNews) {
    return next(
      new ErrorResponse(`Crypto News not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: cryptoNews });
});

//@desc         Create new Crypto News
//@route        POST /api/crypto-news
//@access       Public
exports.createCryptoNews = asyncHandler(async (req, res, next) => {
  const cryptoNews = await CryptoNews.create(req.body);
  res.status(201).json({
    success: true,
    data: cryptoNews,
  });
});

//@desc         Update single Crypto News
//@route        PUT /api/crypto-news/:id
//@access       Privert
exports.updateCryptoNewsById = asyncHandler(async (req, res, next) => {
  const cryptoNews = await CryptoNews.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!cryptoNews) {
    return next(
      new ErrorResponse(`Crypto News not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: cryptoNews });
});

//@desc         Delete single Crypto News
//@route        DELETE /api/crypto-news/:id
//@access       Privert
exports.deleteCryptoNewsById = asyncHandler(async (req, res, next) => {
  const cryptoNews = await CryptoNews.findById(req.params.id);
  if (!cryptoNews) {
    return next(
      new ErrorResponse(`Crypto News not found with id of ${req.params.id}`, 404)
    );
  }

  cryptoNews.remove();

  res.status(200).json({ success: true, data: {} });
});
