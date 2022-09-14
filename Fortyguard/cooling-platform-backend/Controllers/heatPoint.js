const HeatPoint = require('../Models/HeatPoint');
const asyncHandler = require('../Middleware/async');
const ErrorResponse = require('../Utils/errorResponse');

//@doc          Get all heat points
//@route        GET /api/heat-points
//@access       Public
exports.getAllHeatPoints = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@doc          Get single heat point
//@route        GET /api/heat-points/:id
//@access       Public
exports.getHeatPointById = asyncHandler(async (req, res, next) => {
  const heatPoint = await HeatPoint.findById(req.params.id);
  if (!heatPoint) {
    return next(
      new ErrorResponse(`Heat point not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: heatPoint });
});

//@doc          Create new heat point
//@route        POST /api/heat-points
//@access       Public
exports.createHeatPoint = asyncHandler(async (req, res, next) => {
  try {
    let responseList = [];

    await Promise.all(
      req.body.length > 0 &&
        req.body.map(async i => {
          if (i.time != (null || '')) {
            const response = await HeatPoint.create(i);
            responseList.push(response);
          }
        })
    );

    res.status(201).json({
      success: true,
      msg: 'Data uploaded',
      data: responseList,
    });
  } catch (error) {
    console.log(error);
  }
});

//@doc          Update single heat point
//@route        PUT /api/heat-points/:id
//@access       Privert
exports.updateHeatPointById = asyncHandler(async (req, res, next) => {
  const heatPoint = await HeatPoint.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!heatPoint) {
    return next(
      new ErrorResponse(`Heat point not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: heatPoint });
});

//@doc          Delete single heat point
//@route        DELETE /api/heat-points/:id
//@access       Privert
exports.deleteHeatPointById = asyncHandler(async (req, res, next) => {
  const heatPoint = await HeatPoint.findById(req.params.id);
  if (!heatPoint) {
    return next(
      new ErrorResponse(`Heat point not found with id of ${req.params.id}`, 404)
    );
  }

  heatPoint.remove();

  res.status(200).json({ success: true, data: {} });
});
