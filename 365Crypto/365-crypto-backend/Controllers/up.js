const asyncHandler = require("../Middleware/async");

//@desc         Backend ready test
//@route        GET /up
//@access       Public
exports.up = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});
