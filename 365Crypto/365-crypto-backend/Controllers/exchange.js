const Exchange = require("../Models/Exchange");
const asyncHandler = require("../Middleware/async");
const ErrorResponse = require("../Utils/errorResponse");
const path = require("path");
var fs = require("fs");

//@desc         Get all exchange
//@route        GET /api/exchange
//@access       Public
exports.getAllExchange = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc         Get single exchange
//@route        GET /api/exchange/:id
//@access       Public
exports.getExchangeById = asyncHandler(async (req, res, next) => {
  //Get the exchange related to requested id
  const exchange = await Exchange.findById(req.params.id);

  //Checking exchange exist
  if (!exchange) {
    return next(
      new ErrorResponse(`Exchange not found with id of ${req.params.id}`, 404)
    );
  }

  //Returns reponse
  res.status(200).json({ success: true, data: exchange });
});

//@desc         Create new exchange (With image file)
//@route        POST /api/exchange
//@access       Public
exports.createExchange = asyncHandler(async (req, res, next) => {
  //Create the exchange
  let exchange = await Exchange.create(req.body);

  //Checking file input
  if (req.files) {
    const file = req.files.image;

    //Make sure the uploaded file is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload a valid image`, 400));
    }

    //Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload a image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }

    //Create custom filename
    file.name = `photo_${exchange._id}${path.parse(file.name).ext}`;

    //Update image path variable
    exchange.image = `Uploads/Exchange/photo_${exchange._id}${
      path.parse(file.name).ext
    }`;

    //File path and update database name
    file.mv(
      `${process.env.FILE_UPLOAD_PATH}/Uploads/Exchange/${file.name}`,
      async (err) => {
        if (err) {
          console.log(err);
          return next(new ErrorResponse(`Problem with file upload.`, 500));
        }
      }
    );

    //Image updated exchange
    exchange = await Exchange.findByIdAndUpdate(exchange._id, exchange, {
      new: true,
      runValidators: true,
    });
  }

  //Returns the response
  res.status(200).json({
    success: true,
    data: exchange,
  });
});

//@desc         Update single future
//@route        PUT /api/exchange/:id
//@access       Privert
exports.updateExchangeById = asyncHandler(async (req, res, next) => {
  //Get the exchange related to requested id
  let exchange = await Exchange.findOne({ _id: req.params.id });

  //Checking exchange exists
  if (!exchange) {
    return next(
      new ErrorResponse(`Exchange not found with id of ${req.params.id}`, 404)
    );
  }

  // Get all the key values of the req.body Object
  const keyValues = Object.keys(req.body);

  // Check and update values through req.body
  keyValues.forEach((i) => {
    if (req.body[i]) exchange[i] = req.body[i];
  });

  //Checking file input
  if (req.files) {
    const file = req.files.image;

    //Image file path to remove uploaded image for stop duplicating
    const file_path = `${process.env.FILE_UPLOAD_PATH}/${exchange.image}`;

    //Image file remove
    fs.unlinkSync(file_path);

    //Make sure the uploaded file is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload a valid image`, 400));
    }

    //Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload a image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }

    //Create custom filename
    file.name = `photo_${exchange._id}${path.parse(file.name).ext}`;

    //Update image path variable
    exchange.image = `Uploads/Exchange/photo_${exchange._id}${
      path.parse(file.name).ext
    }`;

    //File path and update database name
    file.mv(
      `${process.env.FILE_UPLOAD_PATH}/Uploads/Exchange/${file.name}`,
      async (err) => {
        if (err) {
          console.log(err);
          return next(new ErrorResponse(`Problem with file upload.`, 500));
        }
      }
    );
  }

  //Updated exchange
  const exchange_response = await Exchange.findByIdAndUpdate(
    exchange._id,
    exchange,
    {
      new: true,
      runValidators: true,
    }
  );

  //Returns the response
  res.status(200).json({
    success: true,
    data: exchange_response,
  });
});

//@desc         Delete single exchange
//@route        DELETE /api/exchange/:id
//@access       Privert
exports.deleteExchangeById = asyncHandler(async (req, res, next) => {
  //Get the exchange related to requested id
  const exchange = await Exchange.findById(req.params.id);

  //Checking exchange exist
  if (!exchange) {
    return next(
      new ErrorResponse(`Exchange not found with id of ${req.params.id}`, 404)
    );
  }

  //Image file path
  const file_path = `${process.env.FILE_UPLOAD_PATH}/${exchange.image}`;

  //Image file remove
  fs.unlinkSync(file_path);

  //Remove DB object
  exchange.remove();

  //Returns the response
  res.status(200).json({ success: true, data: {} });
});
