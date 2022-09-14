const Liquidation_15min = require("../../Models/Liquidation/Liquidation_15min");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all liquidation_15min
//@route        GET /api/liquidation/15min
//@access       Public
exports.getAllLiquidation_15min = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single liquidation_15min
//@route        GET /api/liquidation/15min/:id
//@access       Public
exports.getLiquidation_15minById = asyncHandler(async (req, res, next) => {
  const liquidation_15min = await Liquidation_15min.findById(req.params.id);
  if (!liquidation_15min) {
    return next(
      new ErrorResponse(
        `Liquidation(15min) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_15min });
});

//@desc         Create new liquidation_15min
//@route        POST /api/liquidation/15min
//@access       Public
exports.createLiquidation_15min = asyncHandler(async (req, res, next) => {
  const liquidation_15min = await Liquidation_15min.create(req.body);
  res.status(201).json({
    success: true,
    data: liquidation_15min,
  });
});

//@desc         Update single liquidation_15min
//@route        PUT /api/liquidation/15min/:id
//@access       Privert
exports.updateLiquidation_15minById = asyncHandler(async (req, res, next) => {
  const liquidation_15min = await Liquidation_15min.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!liquidation_15min) {
    return next(
      new ErrorResponse(
        `Liquidation(15min) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_15min });
});

//@desc         Delete single liquidation_15min
//@route        DELETE /api/liquidation/15min/:id
//@access       Privert
exports.deleteLiquidation_15minById = asyncHandler(async (req, res, next) => {
  const liquidation_15min = await Liquidation_15min.findById(req.params.id);
  if (!liquidation_15min) {
    return next(
      new ErrorResponse(
        `Liquidation(15min) not found with id of ${req.params.id}`,
        404
      )
    );
  }

  liquidation_15min.remove();

  res.status(200).json({ success: true, data: {} });
});
