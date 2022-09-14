const Liquidation_1hr = require("../../Models/Liquidation/Liquidation_1hr");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all liquidation_1hr
//@route        GET /api/liquidation/1hr
//@access       Public
exports.getAllLiquidation_1hr = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single liquidation_1hr
//@route        GET /api/liquidation/1hr/:id
//@access       Public
exports.getLiquidation_1hrById = asyncHandler(async (req, res, next) => {
  const liquidation_1hr = await Liquidation_1hr.findById(req.params.id);
  if (!liquidation_1hr) {
    return next(
      new ErrorResponse(
        `Liquidation(1hr) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_1hr });
});

//@desc         Create new liquidation_1hr
//@route        POST /api/liquidation/1hr
//@access       Public
exports.createLiquidation_1hr = asyncHandler(async (req, res, next) => {
  const liquidation_1hr = await Liquidation_1hr.create(req.body);
  res.status(201).json({
    success: true,
    data: liquidation_1hr,
  });
});

//@desc         Update single liquidation_1hr
//@route        PUT /api/liquidation/1hr/:id
//@access       Privert
exports.updateLiquidation_1hrById = asyncHandler(async (req, res, next) => {
  const liquidation_1hr = await Liquidation_1hr.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!liquidation_1hr) {
    return next(
      new ErrorResponse(
        `Liquidation(1hr) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_1hr });
});

//@desc         Delete single liquidation_1hr
//@route        DELETE /api/liquidation/1hr/:id
//@access       Privert
exports.deleteLiquidation_1hrById = asyncHandler(async (req, res, next) => {
  const liquidation_1hr = await Liquidation_1hr.findById(req.params.id);
  if (!liquidation_1hr) {
    return next(
      new ErrorResponse(
        `Liquidation(1hr) not found with id of ${req.params.id}`,
        404
      )
    );
  }

  liquidation_1hr.remove();

  res.status(200).json({ success: true, data: {} });
});
