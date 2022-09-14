const Pair = require("../Models/Pair");
const asyncHandler = require("../Middleware/async");
const ErrorResponse = require("../Utils/errorResponse");

//@desc         Get all pair
//@route        GET /api/pair
//@access       Public
exports.getAllPair = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single pair
//@route        GET /api/pair/:id
//@access       Public
exports.getPairById = asyncHandler(async (req, res, next) => {
  const pair = await Pair.findById(req.params.id);
  if (!pair) {
    return next(
      new ErrorResponse(`Pair not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: pair });
});

//@desc         Create new pair
//@route        POST /api/pair
//@access       Public
exports.createPair = asyncHandler(async (req, res, next) => {
  const pair = await Pair.create(req.body);
  res.status(201).json({
    success: true,
    data: pair,
  });
});

//@desc         Update single pair
//@route        PUT /api/pair/:id
//@access       Privert
exports.updatePairById = asyncHandler(async (req, res, next) => {
  const pair = await Pair.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!pair) {
    return next(
      new ErrorResponse(`Pair not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: pair });
});

//@desc         Delete single pair
//@route        DELETE /api/pair/:id
//@access       Privert
exports.deletePairById = asyncHandler(async (req, res, next) => {
  const pair = await Pair.findById(req.params.id);
  if (!pair) {
    return next(
      new ErrorResponse(`Pair not found with id of ${req.params.id}`, 404)
    );
  }

  pair.remove();

  res.status(200).json({ success: true, data: {} });
});
