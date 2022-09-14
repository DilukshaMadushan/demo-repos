const OpenInterestVolumeHistory_5min = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_5min");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all open_interest_volume_history_5min
//@route        GET /api/open-interest-volume-history/5min
//@access       Public
exports.getAllOpenInterestVolumeHistory_5min = asyncHandler(
  async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  }
);

//@desc         Get single open_interest_volume_history_5min
//@route        GET /api/open-interest-volume-history/5min/:id
//@access       Public
exports.getOpenInterestVolumeHistory_5minById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_5min =
      await OpenInterestVolumeHistory_5min.findById(req.params.id);
    if (!openInterestVolumeHistory_5min) {
      return next(
        new ErrorResponse(
          `Open interest volume history (5min) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_5min });
  }
);

//@desc         Create new open_interest_volume_history_5min
//@route        POST /api/open-interest-volume-history/5min
//@access       Public
exports.createOpenInterestVolumeHistory_5min = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_5min =
      await OpenInterestVolumeHistory_5min.create(req.body);
    res.status(201).json({
      success: true,
      data: openInterestVolumeHistory_5min,
    });
  }
);

//@desc         Update single open_interest_volume_history_5min
//@route        PUT /api/open-interest-volume-history/5min/:id
//@access       Privert
exports.updateOpenInterestVolumeHistory_5minById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_5min =
      await OpenInterestVolumeHistory_5min.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    if (!openInterestVolumeHistory_5min) {
      return next(
        new ErrorResponse(
          `Open interest volume history (5min) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_5min });
  }
);

//@desc         Delete single open_interest_volume_history_5min
//@route        DELETE /api/open-interest-volume-history/5min/:id
//@access       Privert
exports.deleteOpenInterestVolumeHistory_5minById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_5min =
      await OpenInterestVolumeHistory_5min.findById(req.params.id);
    if (!openInterestVolumeHistory_5min) {
      return next(
        new ErrorResponse(
          `Open interest volume history (5min) not found with id of ${req.params.id}`,
          404
        )
      );
    }

    openInterestVolumeHistory_5min.remove();

    res.status(200).json({ success: true, data: {} });
  }
);
