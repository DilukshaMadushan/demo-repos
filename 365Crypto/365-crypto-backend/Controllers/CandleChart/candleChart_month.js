const CandleChart_month = require("../../Models/CandleChart/CandleChart_month");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all candle_chart_month
//@route        GET /api/candle-chart/month
//@access       Public
exports.getAllCandleChart_month = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single candle_chart_month
//@route        GET /api/candle-chart/month/:id
//@access       Public
exports.getCandleChart_monthById = asyncHandler(async (req, res, next) => {
  const candle_chart_month = await CandleChart_month.findById(req.params.id);
  if (!candle_chart_month) {
    return next(
      new ErrorResponse(
        `Candle chart(month) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: candle_chart_month });
});

//@desc         Create new candle_chart_month
//@route        POST /api/candle-chart/month
//@access       Public
exports.createCandleChart_month = asyncHandler(async (req, res, next) => {
  const candle_chart_month = await CandleChart_month.create(req.body);
  res.status(201).json({
    success: true,
    data: candle_chart_month,
  });
});

//@desc         Update single candle_chart_month
//@route        PUT /api/candle-chart/month/:id
//@access       Privert
exports.updateCandleChart_monthById = asyncHandler(async (req, res, next) => {
  const candle_chart_month = await CandleChart_month.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!candle_chart_month) {
    return next(
      new ErrorResponse(
        `Candle chart(month) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: candle_chart_month });
});

//@desc         Delete single candle_chart_month
//@route        DELETE /api/candle-chart/month/:id
//@access       Privert
exports.deleteCandleChart_monthById = asyncHandler(async (req, res, next) => {
  const candle_chart_month = await CandleChart_month.findById(req.params.id);
  if (!candle_chart_month) {
    return next(
      new ErrorResponse(
        `Candle chart(month) not found with id of ${req.params.id}`,
        404
      )
    );
  }

  candle_chart_month.remove();

  res.status(200).json({ success: true, data: {} });
});
