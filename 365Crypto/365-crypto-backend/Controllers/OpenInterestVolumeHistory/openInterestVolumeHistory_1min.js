const OpenInterestVolumeHistory_1min = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_1min");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all open_interest_volume_history_1min
//@route        GET /api/open-interest-volume-history/1min
//@access       Public
exports.getAllOpenInterestVolumeHistory_1min = asyncHandler(
  async (req, res, next) => {
    if (req.params.type) {
      const courses = await Course.find({
        bootcamp: req.params.bootcampId,
      });

      return res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
      });
    } else {
      res.status(200).json(res.advancedResults);
    }
  }
);

//@desc         Get single open_interest_volume_history_1min
//@route        GET /api/open-interest-volume-history/1min/:id
//@access       Public
exports.getOpenInterestVolumeHistory_1minById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_1min =
      await OpenInterestVolumeHistory_1min.findById(req.params.id);
    if (!openInterestVolumeHistory_1min) {
      return next(
        new ErrorResponse(
          `Open interest volume history (1min) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_1min });
  }
);

//@desc         Create new open_interest_volume_history_1min
//@route        POST /api/open-interest-volume-history/1min
//@access       Public
exports.createOpenInterestVolumeHistory_1min = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_1min =
      await OpenInterestVolumeHistory_1min.create(req.body);
    res.status(201).json({
      success: true,
      data: openInterestVolumeHistory_1min,
    });
  }
);

//@desc         Update single open_interest_volume_history_1min
//@route        PUT /api/open-interest-volume-history/1min/:id
//@access       Privert
exports.updateOpenInterestVolumeHistory_1minById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_1min =
      await OpenInterestVolumeHistory_1min.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    if (!openInterestVolumeHistory_1min) {
      return next(
        new ErrorResponse(
          `Open interest volume history (1min) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_1min });
  }
);

//@desc         Delete single open_interest_volume_history_1min
//@route        DELETE /api/open-interest-volume-history/1min/:id
//@access       Privert
exports.deleteOpenInterestVolumeHistory_1minById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_1min =
      await OpenInterestVolumeHistory_1min.findById(req.params.id);
    if (!openInterestVolumeHistory_1min) {
      return next(
        new ErrorResponse(
          `Open interest volume history (1min) not found with id of ${req.params.id}`,
          404
        )
      );
    }

    openInterestVolumeHistory_1min.remove();

    res.status(200).json({ success: true, data: {} });
  }
);
