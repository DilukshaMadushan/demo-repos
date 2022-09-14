const CoinEvents_Categories = require("../../Models/CoinEvents/CoinEvents_Categories");
const CoinEvents = require("../../Models/CoinEvents/CoinEvents");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all coin events categories
//@route        GET /api/coin-events/categories
//@access       Public
exports.getAllCoinEvents_Categories = asyncHandler(async (req, res, next) => {
  //Get non expired coin events
  CoinEvents.find({
    dateEvent: { $gt: new Date(Date.now()) },
  })
    .select("categories")
    .exec(async (err, dataList) => {
      //Checking CoinEvents exist or not
      if (dataList.length > 0) {
        //Filtering coinEvents _id's
        const list = await dataList.map((item) => {
          return { _id: item.categories[0] };
        });

        //Get Categories of valid coin events
        const categories = await CoinEvents_Categories.find({
          $or: list,
        });

        //Return response valid categories
        res.status(200).json({ success: true, data: categories });
      } else {
        //Return response for empty categories
        res.status(200).json({ success: true, data: [] });
      }
    });
});

//@desc         Get single coin event categories
//@route        GET /api/coin-events/categories/:id
//@access       Public
exports.getCoinEvents_CategoriesById = asyncHandler(async (req, res, next) => {
  const coinEvents_Categories = await CoinEvents_Categories.findById(
    req.params.id
  );
  if (!coinEvents_Categories) {
    return next(
      new ErrorResponse(
        `Coin Event(categories) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: coinEvents_Categories });
});

//@desc         Create new coin event categories
//@route        POST /api/coin-events/categories
//@access       Public
exports.createCoinEvents_Categories = asyncHandler(async (req, res, next) => {
  const coinEvents_Categories = await CoinEvents_Categories.create(req.body);
  res.status(201).json({
    success: true,
    data: coinEvents_Categories,
  });
});

//@desc         Update single coin event categories
//@route        PUT /api/coin-events/categories/:id
//@access       Privert
exports.updateCoinEvents_CategoriesById = asyncHandler(
  async (req, res, next) => {
    const coinEvents_Categories = await CoinEvents_Categories.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!coinEvents_Categories) {
      return next(
        new ErrorResponse(
          `Coin Event(categories) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res.status(200).json({ success: true, data: coinEvents_Categories });
  }
);

//@desc         Delete single coin event categories
//@route        DELETE /api/coin-events/categories/:id
//@access       Privert
exports.deleteCoinEvents_CategoriesById = asyncHandler(
  async (req, res, next) => {
    const coinEvents_Categories = await CoinEvents_Categories.findById(
      req.params.id
    );
    if (!coinEvents_Categories) {
      return next(
        new ErrorResponse(
          `Coin Event(categories) not found with id of ${req.params.id}`,
          404
        )
      );
    }

    coinEvents_Categories.remove();

    res.status(200).json({ success: true, data: {} });
  }
);
