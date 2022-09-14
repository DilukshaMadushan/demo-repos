const Liquidation_5min = require("../../Models/Liquidation/Liquidation_5min");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all liquidation_5min
//@route        GET /api/liquidation/5min
//@access       Public
exports.getAllLiquidation_5min = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single liquidation_5min
//@route        GET /api/liquidation/5min/:id
//@access       Public
exports.getLiquidation_5minById = asyncHandler(async (req, res, next) => {
  const liquidation_5min = await Liquidation_5min.findById(req.params.id);
  if (!liquidation_5min) {
    return next(
      new ErrorResponse(
        `Liquidation(5min) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_5min });
});

//@desc         Create new liquidation_5min
//@route        POST /api/liquidation/5min
//@access       Public
exports.createLiquidation_5min = asyncHandler(async (req, res, next) => {
  const liquidation_5min = await Liquidation_5min.create(req.body);
  res.status(201).json({
    success: true,
    data: liquidation_5min,
  });
});

//@desc         Update single liquidation_5min
//@route        PUT /api/liquidation/5min/:id
//@access       Privert
exports.updateLiquidation_5minById = asyncHandler(async (req, res, next) => {
  const liquidation_5min = await Liquidation_5min.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!liquidation_5min) {
    return next(
      new ErrorResponse(
        `Liquidation(5min) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_5min });
});

//@desc         Delete single liquidation_5min
//@route        DELETE /api/liquidation/5min/:id
//@access       Privert
exports.deleteLiquidation_5minById = asyncHandler(async (req, res, next) => {
  const liquidation_5min = await Liquidation_5min.findById(req.params.id);
  if (!liquidation_5min) {
    return next(
      new ErrorResponse(
        `Liquidation(5min) not found with id of ${req.params.id}`,
        404
      )
    );
  }

  liquidation_5min.remove();

  res.status(200).json({ success: true, data: {} });
});
