const CandleChart_day = require("../../Models/CandleChart/CandleChart_day");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all candle_chart_day
//@route        GET /api/candle-chart/day
//@access       Public
exports.getAllCandleChart_day = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single candle_chart_day
//@route        GET /api/candle-chart/day/:id
//@access       Public
exports.getCandleChart_dayById = asyncHandler(async (req, res, next) => {
  const candle_chart_day = await CandleChart_day.findById(req.params.id);
  if (!candle_chart_day) {
    return next(
      new ErrorResponse(
        `Candle chart(day) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: candle_chart_day });
});

//@desc         Create new candle_chart_day
//@route        POST /api/candle-chart/day
//@access       Public
exports.createCandleChart_day = asyncHandler(async (req, res, next) => {
  const candle_chart_day = await CandleChart_day.create(req.body);
  res.status(201).json({
    success: true,
    data: candle_chart_day,
  });
});

//@desc         Update single candle_chart_day
//@route        PUT /api/candle-chart/day/:id
//@access       Privert
exports.updateCandleChart_dayById = asyncHandler(async (req, res, next) => {
  const candle_chart_day = await CandleChart_day.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!candle_chart_day) {
    return next(
      new ErrorResponse(
        `Candle chart(day) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: candle_chart_day });
});

//@desc         Delete single candle_chart_day
//@route        DELETE /api/candle-chart/day/:id
//@access       Privert
exports.deleteCandleChart_dayById = asyncHandler(async (req, res, next) => {
  const candle_chart_day = await CandleChart_day.findById(req.params.id);
  if (!candle_chart_day) {
    return next(
      new ErrorResponse(
        `Candle chart(day) not found with id of ${req.params.id}`,
        404
      )
    );
  }

  candle_chart_day.remove();

  res.status(200).json({ success: true, data: {} });
});
