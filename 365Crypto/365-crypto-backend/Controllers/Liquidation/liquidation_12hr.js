const Liquidation_12hr = require("../../Models/Liquidation/Liquidation_12hr");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all liquidation_12hr
//@route        GET /api/liquidation/12hr
//@access       Public
exports.getAllLiquidation_12hr = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single liquidation_12hr
//@route        GET /api/liquidation/12hr/:id
//@access       Public
exports.getLiquidation_12hrById = asyncHandler(async (req, res, next) => {
  const liquidation_12hr = await Liquidation_12hr.findById(req.params.id);
  if (!liquidation_12hr) {
    return next(
      new ErrorResponse(
        `Liquidation(12hr) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_12hr });
});

//@desc         Create new liquidation_12hr
//@route        POST /api/liquidation/12hr
//@access       Public
exports.createLiquidation_12hr = asyncHandler(async (req, res, next) => {
  const liquidation_12hr = await Liquidation_12hr.create(req.body);
  res.status(201).json({
    success: true,
    data: liquidation_12hr,
  });
});

//@desc         Update single liquidation_12hr
//@route        PUT /api/liquidation/12hr/:id
//@access       Privert
exports.updateLiquidation_12hrById = asyncHandler(async (req, res, next) => {
  const liquidation_12hr = await Liquidation_12hr.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!liquidation_12hr) {
    return next(
      new ErrorResponse(
        `Liquidation(12hr) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_12hr });
});

//@desc         Delete single liquidation_12hr
//@route        DELETE /api/liquidation/12hr/:id
//@access       Privert
exports.deleteLiquidation_12hrById = asyncHandler(async (req, res, next) => {
  const liquidation_12hr = await Liquidation_12hr.findById(req.params.id);
  if (!liquidation_12hr) {
    return next(
      new ErrorResponse(
        `Liquidation(12hr) not found with id of ${req.params.id}`,
        404
      )
    );
  }

  liquidation_12hr.remove();

  res.status(200).json({ success: true, data: {} });
});
