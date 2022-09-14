const Liquidation_1min = require("../../Models/Liquidation/Liquidation_1min");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all liquidation_1min
//@route        GET /api/liquidation/1min
//@access       Public
exports.getAllLiquidation_1min = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single liquidation_1min
//@route        GET /api/liquidation/1min/:id
//@access       Public
exports.getLiquidation_1minById = asyncHandler(async (req, res, next) => {
  const liquidation_1min = await Liquidation_1min.findById(req.params.id);
  if (!liquidation_1min) {
    return next(
      new ErrorResponse(
        `Liquidation(1min) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_1min });
});

//@desc         Create new liquidation_1min
//@route        POST /api/liquidation/1min
//@access       Public
exports.createLiquidation_1min = asyncHandler(async (req, res, next) => {
  const liquidation_1min = await Liquidation_1min.create(req.body);
  res.status(201).json({
    success: true,
    data: liquidation_1min,
  });
});

//@desc         Update single liquidation_1min
//@route        PUT /api/liquidation/1min/:id
//@access       Privert
exports.updateLiquidation_1minById = asyncHandler(async (req, res, next) => {
  const liquidation_1min = await Liquidation_1min.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!liquidation_1min) {
    return next(
      new ErrorResponse(
        `Liquidation(1min) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_1min });
});

//@desc         Delete single liquidation_1min
//@route        DELETE /api/liquidation/1min/:id
//@access       Privert
exports.deleteLiquidation_1minById = asyncHandler(async (req, res, next) => {
  const liquidation_1min = await Liquidation_1min.findById(req.params.id);
  if (!liquidation_1min) {
    return next(
      new ErrorResponse(
        `Liquidation(1min) not found with id of ${req.params.id}`,
        404
      )
    );
  }

  liquidation_1min.remove();

  res.status(200).json({ success: true, data: {} });
});
