const OpenInterestVolumeHistory_15min = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_15min");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all open_interest_volume_history_15min
//@route        GET /api/open-interest-volume-history/15min
//@access       Public
exports.getAllOpenInterestVolumeHistory_15min = asyncHandler(
  async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  }
);

//@desc         Get single open_interest_volume_history_15min
//@route        GET /api/open-interest-volume-history/15min/:id
//@access       Public
exports.getOpenInterestVolumeHistory_15minById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_15min =
      await OpenInterestVolumeHistory_15min.findById(req.params.id);
    if (!openInterestVolumeHistory_15min) {
      return next(
        new ErrorResponse(
          `Open interest volume history (15min) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_15min });
  }
);

//@desc         Create new open_interest_volume_history_15min
//@route        POST /api/open-interest-volume-history/15min
//@access       Public
exports.createOpenInterestVolumeHistory_15min = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_15min =
      await OpenInterestVolumeHistory_15min.create(req.body);
    res.status(201).json({
      success: true,
      data: openInterestVolumeHistory_15min,
    });
  }
);

//@desc         Update single open_interest_volume_history_15min
//@route        PUT /api/open-interest-volume-history/15min/:id
//@access       Privert
exports.updateOpenInterestVolumeHistory_15minById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_15min =
      await OpenInterestVolumeHistory_15min.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    if (!openInterestVolumeHistory_15min) {
      return next(
        new ErrorResponse(
          `Open interest volume history (15min) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_15min });
  }
);

//@desc         Delete single open_interest_volume_history_15min
//@route        DELETE /api/open-interest-volume-history/15min/:id
//@access       Privert
exports.deleteOpenInterestVolumeHistory_15minById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_15min =
      await OpenInterestVolumeHistory_15min.findById(req.params.id);
    if (!openInterestVolumeHistory_15min) {
      return next(
        new ErrorResponse(
          `Open interest volume history (15min) not found with id of ${req.params.id}`,
          404
        )
      );
    }

    openInterestVolumeHistory_15min.remove();

    res.status(200).json({ success: true, data: {} });
  }
);
