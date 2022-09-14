const CandleChart_week = require("../../Models/CandleChart/CandleChart_week");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all candle_chart_week
//@route        GET /api/candle-chart/week
//@access       Public
exports.getAllCandleChart_week = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single candle_chart_week
//@route        GET /api/candle-chart/week/:id
//@access       Public
exports.getCandleChart_weekById = asyncHandler(async (req, res, next) => {
  const candle_chart_week = await CandleChart_week.findById(req.params.id);
  if (!candle_chart_week) {
    return next(
      new ErrorResponse(
        `Candle chart(week) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: candle_chart_week });
});

//@desc         Create new candle_chart_week
//@route        POST /api/candle-chart/week
//@access       Public
exports.createCandleChart_week = asyncHandler(async (req, res, next) => {
  const candle_chart_week = await CandleChart_week.create(req.body);
  res.status(201).json({
    success: true,
    data: candle_chart_week,
  });
});

//@desc         Update single candle_chart_week
//@route        PUT /api/candle-chart/week/:id
//@access       Privert
exports.updateCandleChart_weekById = asyncHandler(async (req, res, next) => {
  const candle_chart_week = await CandleChart_week.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!candle_chart_week) {
    return next(
      new ErrorResponse(
        `Candle chart(week) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: candle_chart_week });
});

//@desc         Delete single candle_chart_week
//@route        DELETE /api/candle-chart/week/:id
//@access       Privert
exports.deleteCandleChart_weekById = asyncHandler(async (req, res, next) => {
  const candle_chart_week = await CandleChart_week.findById(req.params.id);
  if (!candle_chart_week) {
    return next(
      new ErrorResponse(
        `Candle chart(week) not found with id of ${req.params.id}`,
        404
      )
    );
  }

  candle_chart_week.remove();

  res.status(200).json({ success: true, data: {} });
});
