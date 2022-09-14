const Liquidation_4hr = require("../../Models/Liquidation/Liquidation_4hr");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all liquidation_4hr
//@route        GET /api/liquidation/4hr
//@access       Public
exports.getAllLiquidation_4hr = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single liquidation_4hr
//@route        GET /api/liquidation/4hr/:id
//@access       Public
exports.getLiquidation_4hrById = asyncHandler(async (req, res, next) => {
  const liquidation_4hr = await Liquidation_4hr.findById(req.params.id);
  if (!liquidation_4hr) {
    return next(
      new ErrorResponse(
        `Liquidation(4hr) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_4hr });
});

//@desc         Create new liquidation_4hr
//@route        POST /api/liquidation/4hr
//@access       Public
exports.createLiquidation_4hr = asyncHandler(async (req, res, next) => {
  const liquidation_4hr = await Liquidation_4hr.create(req.body);
  res.status(201).json({
    success: true,
    data: liquidation_4hr,
  });
});

//@desc         Update single liquidation_4hr
//@route        PUT /api/liquidation/4hr/:id
//@access       Privert
exports.updateLiquidation_4hrById = asyncHandler(async (req, res, next) => {
  const liquidation_4hr = await Liquidation_4hr.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!liquidation_4hr) {
    return next(
      new ErrorResponse(
        `Liquidation(4hr) not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: liquidation_4hr });
});

//@desc         Delete single liquidation_4hr
//@route        DELETE /api/liquidation/4hr/:id
//@access       Privert
exports.deleteLiquidation_4hrById = asyncHandler(async (req, res, next) => {
  const liquidation_4hr = await Liquidation_4hr.findById(req.params.id);
  if (!liquidation_4hr) {
    return next(
      new ErrorResponse(
        `Liquidation(4hr) not found with id of ${req.params.id}`,
        404
      )
    );
  }

  liquidation_4hr.remove();

  res.status(200).json({ success: true, data: {} });
});
