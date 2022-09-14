const Liquidation_24hr = require("../../Models/Liquidation/Liquidation_24hr");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all liquidation_24hr
//@route        GET /api/liquidation/24hr
//@access       Public
exports.getAllLiquidation_24hr = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single liquidation_24hr
//@route        GET /api/liquidation/24hr/:id
//@access       Public
exports.getLiquidation_24hrById = asyncHandler(async (req, res, next) => {
  const liquidation_24hr = await Liquidation_24hr.findById(req.params.id);
  if (!liquidation_24hr) {
    return next(
      new ErrorResponse(
        `Liquidation(24hr) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_24hr });
});

//@desc         Create new liquidation_24hr
//@route        POST /api/liquidation/24hr
//@access       Public
exports.createLiquidation_24hr = asyncHandler(async (req, res, next) => {
  const liquidation_24hr = await Liquidation_24hr.create(req.body);
  res.status(201).json({
    success: true,
    data: liquidation_24hr,
  });
});

//@desc         Update single liquidation_24hr
//@route        PUT /api/liquidation/24hr/:id
//@access       Privert
exports.updateLiquidation_24hrById = asyncHandler(async (req, res, next) => {
  const liquidation_24hr = await Liquidation_24hr.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!liquidation_24hr) {
    return next(
      new ErrorResponse(
        `Liquidation(24hr) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_24hr });
});

//@desc         Delete single liquidation_24hr
//@route        DELETE /api/liquidation/24hr/:id
//@access       Privert
exports.deleteLiquidation_24hrById = asyncHandler(async (req, res, next) => {
  const liquidation_24hr = await Liquidation_24hr.findById(req.params.id);
  if (!liquidation_24hr) {
    return next(
      new ErrorResponse(
        `Liquidation(24hr) not found with id of ${req.params.id}`,
        404
      )
    );
  }

  liquidation_24hr.remove();

  res.status(200).json({ success: true, data: {} });
});
