const Spot = require("../Models/Spot");
const asyncHandler = require("../Middleware/async");
const ErrorResponse = require("../Utils/errorResponse");

//@desc         Get all spot
//@route        GET /api/spot
//@access       Public
exports.getAllSpot = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single spot
//@route        GET /api/spot/:id
//@access       Public
exports.getSpotById = asyncHandler(async (req, res, next) => {
  const spot = await Spot.findById(req.params.id);
  if (!spot) {
    return next(
      new ErrorResponse(`Spot not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: spot });
});

//@desc         Create new spot
//@route        POST /api/spot
//@access       Public
exports.createSpot = asyncHandler(async (req, res, next) => {
  const spot = await Spot.create(req.body);
  res.status(201).json({
    success: true,
    data: spot,
  });
});

//@desc         Update single spot
//@route        PUT /api/spot/:id
//@access       Privert
exports.updateSpotById = asyncHandler(async (req, res, next) => {
  const spot = await Spot.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!spot) {
    return next(
      new ErrorResponse(`Spot not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: spot });
});

//@desc         Delete single spot
//@route        DELETE /api/spot/:id
//@access       Privert
exports.deleteSpotById = asyncHandler(async (req, res, next) => {
  const spot = await Spot.findById(req.params.id);
  if (!spot) {
    return next(
      new ErrorResponse(`Spot not found with id of ${req.params.id}`, 404)
    );
  }

  spot.remove();

  res.status(200).json({ success: true, data: {} });
});
