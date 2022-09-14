const Sensor = require("../Models/Sensor");
const asyncHandler = require("../Middleware/async");
const ErrorResponse = require("../Utils/errorResponse");

//@desc         Get all sensor
//@route        GET /api/sensors
//@access       Public
exports.getAllSensors = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single sensor
//@route        GET /api/sensors/:id
//@access       Public
exports.getSensorById = asyncHandler(async (req, res, next) => {
  const sensor = await Sensor.findById(req.params.id);
  if (!sensor) {
    return next(
      new ErrorResponse(`Sensor not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: sensor });
});

//@desc         Create new sensor
//@route        POST /api/sensors
//@access       Public
exports.createSensor = asyncHandler(async (req, res, next) => {
  const sensor = await Sensor.create(req.body);
  res.status(201).json({
    success: true,
    data: sensor,
  });
});

//@desc         Update single sensor
//@route        PUT /api/sensors/:id
//@access       Privert
exports.updateSensorById = asyncHandler(async (req, res, next) => {
  const sensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!sensor) {
    return next(
      new ErrorResponse(`Sensor not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: sensor });
});

//@desc         Delete single sensor
//@route        DELETE /api/sensors/:id
//@access       Privert
exports.deleteSensorById = asyncHandler(async (req, res, next) => {
  const sensor = await Sensor.findById(req.params.id);
  if (!sensor) {
    return next(
      new ErrorResponse(`Sensor not found with id of ${req.params.id}`, 404)
    );
  }

  sensor.remove();

  res.status(200).json({ success: true, data: {} });
});
