const CandleChart_year = require("../../Models/CandleChart/CandleChart_year");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all candle_chart_year
//@route        GET /api/candle-chart/year
//@access       Public
exports.getAllCandleChart_year = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single candle_chart_year
//@route        GET /api/candle-chart/year/:id
//@access       Public
exports.getCandleChart_yearById = asyncHandler(async (req, res, next) => {
  const candle_chart_year = await CandleChart_year.findById(req.params.id);
  if (!candle_chart_year) {
    return next(
      new ErrorResponse(
        `Candle chart(year) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: candle_chart_year });
});

//@desc         Create new candle_chart_year
//@route        POST /api/candle-chart/year
//@access       Public
exports.createCandleChart_year = asyncHandler(async (req, res, next) => {
  const candle_chart_year = await CandleChart_year.create(req.body);
  res.status(201).json({
    success: true,
    data: candle_chart_year,
  });
});

//@desc         Update single candle_chart_year
//@route        PUT /api/candle-chart/year/:id
//@access       Privert
exports.updateCandleChart_yearById = asyncHandler(async (req, res, next) => {
  const candle_chart_year = await CandleChart_year.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!candle_chart_year) {
    return next(
      new ErrorResponse(
        `Candle chart(year) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: candle_chart_year });
});

//@desc         Delete single candle_chart_year
//@route        DELETE /api/candle-chart/year/:id
//@access       Privert
exports.deleteCandleChart_yearById = asyncHandler(async (req, res, next) => {
  const candle_chart_year = await CandleChart_year.findById(req.params.id);
  if (!candle_chart_year) {
    return next(
      new ErrorResponse(
        `Candle chart(year) not found with id of ${req.params.id}`,
        404
      )
    );
  }

  candle_chart_year.remove();

  res.status(200).json({ success: true, data: {} });
});
