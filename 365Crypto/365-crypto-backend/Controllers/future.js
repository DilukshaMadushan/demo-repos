const Future = require("../Models/Future");
const asyncHandler = require("../Middleware/async");
const ErrorResponse = require("../Utils/errorResponse");

//@desc         Get all future
//@route        GET /api/future
//@access       Public
exports.getAllFuture = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single future
//@route        GET /api/future/:id
//@access       Public
exports.getFutureById = asyncHandler(async (req, res, next) => {
  const future = await Future.findById(req.params.id);
  if (!future) {
    return next(
      new ErrorResponse(`Future not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: future });
});

//@desc         Create new future
//@route        POST /api/future
//@access       Public
exports.createFuture = asyncHandler(async (req, res, next) => {
  const future = await Future.create(req.body);
  res.status(201).json({
    success: true,
    data: future,
  });
});

//@desc         Update single future
//@route        PUT /api/future/:id
//@access       Privert
exports.updateFutureById = asyncHandler(async (req, res, next) => {
  const future = await Future.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!future) {
    return next(
      new ErrorResponse(`Future not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: future });
});

//@desc         Delete single future
//@route        DELETE /api/future/:id
//@access       Privert
exports.deleteFutureById = asyncHandler(async (req, res, next) => {
  const future = await Future.findById(req.params.id);
  if (!future) {
    return next(
      new ErrorResponse(`Future not found with id of ${req.params.id}`, 404)
    );
  }

  future.remove();

  res.status(200).json({ success: true, data: {} });
});
