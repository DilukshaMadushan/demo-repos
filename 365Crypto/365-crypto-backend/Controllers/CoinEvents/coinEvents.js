const CoinEvents = require("../../Models/CoinEvents/CoinEvents");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all coin events
//@route        GET /api/coin-events
//@access       Public
exports.getAllCoinEvents = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.searchCoinEvents);
});

//@desc         Get single coin event
//@route        GET /api/coin-events/:id
//@access       Public
exports.getCoinEventsById = asyncHandler(async (req, res, next) => {
  const coinEvents = await CoinEvents.findById(req.params.id);
  if (!coinEvents) {
    return next(
      new ErrorResponse(`Coin Event not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: coinEvents });
});

//@desc         Create new coin event
//@route        POST /api/coin-events
//@access       Public
exports.createCoinEvents = asyncHandler(async (req, res, next) => {
  const coinEvents = await CoinEvents.create(req.body);
  res.status(201).json({
    success: true,
    data: coinEvents,
  });
});

//@desc         Update single coin event
//@route        PUT /api/coin-events/:id
//@access       Privert
exports.updateCoinEventsById = asyncHandler(async (req, res, next) => {
  const coinEvents = await CoinEvents.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!coinEvents) {
    return next(
      new ErrorResponse(`Coin Event not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: coinEvents });
});

//@desc         Delete single coin event
//@route        DELETE /api/coin-events/:id
//@access       Privert
exports.deleteCoinEventsById = asyncHandler(async (req, res, next) => {
  const coinEvents = await CoinEvents.findById(req.params.id);
  if (!coinEvents) {
    return next(
      new ErrorResponse(`Coin Event not found with id of ${req.params.id}`, 404)
    );
  }

  coinEvents.remove();

  res.status(200).json({ success: true, data: {} });
});
