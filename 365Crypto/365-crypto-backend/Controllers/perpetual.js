const Perpetual = require("../Models/Perpetual");
const asyncHandler = require("../Middleware/async");
const ErrorResponse = require("../Utils/errorResponse");

//@desc         Get all perpetual
//@route        GET /api/perpetual
//@access       Public
exports.getAllPerpetual = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single perpetual
//@route        GET /api/perpetual/:id
//@access       Public
exports.getPerpetualById = asyncHandler(async (req, res, next) => {
  const perpetual = await Perpetual.findById(req.params.id);
  if (!perpetual) {
    return next(
      new ErrorResponse(`Perpetual not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: perpetual });
});

//@desc         Create new perpetual
//@route        POST /api/perpetual
//@access       Public
exports.createPerpetual = asyncHandler(async (req, res, next) => {
  const perpetual = await Perpetual.create(req.body);
  res.status(201).json({
    success: true,
    data: perpetual,
  });
});

//@desc         Update single perpetual
//@route        PUT /api/perpetual/:id
//@access       Privert
exports.updatePerpetualById = asyncHandler(async (req, res, next) => {
  const perpetual = await Perpetual.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!perpetual) {
    return next(
      new ErrorResponse(`Perpetual not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: perpetual });
});

//@desc         Delete single perpetual
//@route        DELETE /api/perpetual/:id
//@access       Privert
exports.deletePerpetualById = asyncHandler(async (req, res, next) => {
  const perpetual = await Perpetual.findById(req.params.id);
  if (!perpetual) {
    return next(
      new ErrorResponse(`Perpetual not found with id of ${req.params.id}`, 404)
    );
  }

  perpetual.remove();

  res.status(200).json({ success: true, data: {} });
});
