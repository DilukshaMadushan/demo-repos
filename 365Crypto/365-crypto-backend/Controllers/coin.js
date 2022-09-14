const Coin = require("../Models/Coin");
const asyncHandler = require("../Middleware/async");
const ErrorResponse = require("../Utils/errorResponse");
const path = require("path");
var fs = require("fs");

//@desc         Get all coin
//@route        GET /api/coin
//@access       Public
exports.getAllCoin = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.searchCoin);
});

//@desc         Get single coin
//@route        GET /api/coin/:id
//@access       Public
exports.getCoinById = asyncHandler(async (req, res, next) => {
  //Get the exchange related to requested id
  const coin = await Coin.findById(req.params.id);

  //Checking coin exist
  if (!coin) {
    return next(
      new ErrorResponse(`Coin not found with id of ${req.params.id}`, 404)
    );
  }

  //Returns the response
  res.status(200).json({ success: true, data: coin });
});

//@desc         Create new coin
//@route        POST /api/coin
//@access       Public
exports.createCoin = asyncHandler(async (req, res, next) => {
  //Create the coin
  let coin = await Coin.create(req.body);

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
    file.name = `photo_${coin._id}${path.parse(file.name).ext}`;

    //Update image path variable
    coin.image = `Uploads/Coin/photo_${coin._id}${path.parse(file.name).ext}`;

    //File path and update database name
    file.mv(
      `${process.env.FILE_UPLOAD_PATH}/Uploads/Coin/${file.name}`,
      async (err) => {
        if (err) {
          console.log(err);
          return next(new ErrorResponse(`Problem with file upload.`, 500));
        }
      }
    );

    //Image updated coin
    coin = await Coin.findByIdAndUpdate(coin._id, coin, {
      new: true,
      runValidators: true,
    });
  }

  //Returns the response
  res.status(200).json({
    success: true,
    data: coin,
  });
});

//@desc         Update single coin
//@route        PUT /api/coin/:id
//@access       Privert
exports.updateCoinById = asyncHandler(async (req, res, next) => {
  //Get the coin related to requested id
  let coin = await Coin.findOne({ _id: req.params.id });

  //Checking coin exists
  if (!coin) {
    return next(
      new ErrorResponse(`Coin not found with id of ${req.params.id}`, 404)
    );
  }

  // Get all the key values of the req.body Object
  const keyValues = Object.keys(req.body);

  // Check and update values through req.body
  keyValues.forEach((i) => {
    if (req.body[i]) coin[i] = req.body[i];
  });

  //Checking file input
  if (req.files) {
    const file = req.files.image;

    //Image file path to remove uploaded image for stop duplicating
    const file_path = `${process.env.FILE_UPLOAD_PATH}/${coin.image}`;

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
    file.name = `photo_${coin._id}${path.parse(file.name).ext}`;

    //Update image path variable
    coin.image = `Uploads/Coin/photo_${coin._id}${path.parse(file.name).ext}`;

    //File path and update database name
    file.mv(
      `${process.env.FILE_UPLOAD_PATH}/Uploads/Coin/${file.name}`,
      async (err) => {
        if (err) {
          console.log(err);
          return next(new ErrorResponse(`Problem with file upload.`, 500));
        }
      }
    );
  }

  //Updated coin
  const coin_response = await Coin.findByIdAndUpdate(coin._id, coin, {
    new: true,
    runValidators: true,
  });

  //Returns the response
  res.status(200).json({
    success: true,
    data: coin_response,
  });
});

//@desc         Delete single coin
//@route        DELETE /api/coin/:id
//@access       Privert
exports.deleteCoinById = asyncHandler(async (req, res, next) => {
  //Get the coin related to requested id
  const coin = await Coin.findById(req.params.id);

  //Checking coin exist
  if (!coin) {
    return next(
      new ErrorResponse(`Coin not found with id of ${req.params.id}`, 404)
    );
  }

  //Image file path
  const file_path = `${process.env.FILE_UPLOAD_PATH}/${coin.image}`;

  //Image file remove
  fs.unlinkSync(file_path);

  //Remove DB object
  coin.remove();

  //Returns the response
  res.status(200).json({ success: true, data: {} });
});
