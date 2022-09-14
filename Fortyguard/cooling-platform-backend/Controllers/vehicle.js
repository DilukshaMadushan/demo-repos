const Vehicle = require("../Models/Vehicle");
const asyncHandler = require("../Middleware/async");
const ErrorResponse = require("../Utils/errorResponse");

//@desc         Get all vehicle
//@route        GET /api/vehicles
//@access       Public
exports.getAllVehicles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single vehicle
//@route        GET /api/vehicles/:id
//@access       Public
exports.getVehicleById = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) {
    return next(
      new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: vehicle });
});

//@desc         Create new vehicle
//@route        POST /api/vehicles
//@access       Public
exports.createVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.create(req.body);
  res.status(201).json({
    success: true,
    data: vehicle,
  });
});

//@desc         Update single vehicle
//@route        PUT /api/vehicles/:id
//@access       Privert
exports.updateVehicleById = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!vehicle) {
    return next(
      new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: vehicle });
});

//@desc         Delete single vehicle
//@route        DELETE /api/vehicles/:id
//@access       Privert
exports.deleteVehicleById = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) {
    return next(
      new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 404)
    );
  }

  vehicle.remove();

  res.status(200).json({ success: true, data: {} });
});
