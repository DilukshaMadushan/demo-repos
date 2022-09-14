const OpenInterestVolumeHistory_4hr = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_4hr");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all open_interest_volume_history_4hr
//@route        GET /api/open-interest-volume-history/4hr
//@access       Public
exports.getAllOpenInterestVolumeHistory_4hr = asyncHandler(
  async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  }
);

//@desc         Get single open_interest_volume_history_4hr
//@route        GET /api/open-interest-volume-history/4hr/:id
//@access       Public
exports.getOpenInterestVolumeHistory_4hrById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_4hr =
      await OpenInterestVolumeHistory_4hr.findById(req.params.id);
    if (!openInterestVolumeHistory_4hr) {
      return next(
        new ErrorResponse(
          `Open interest volume history (4hr) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_4hr });
  }
);

//@desc         Create new open_interest_volume_history_4hr
//@route        POST /api/open-interest-volume-history/4hr
//@access       Public
exports.createOpenInterestVolumeHistory_4hr = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_4hr =
      await OpenInterestVolumeHistory_4hr.create(req.body);
    res.status(201).json({
      success: true,
      data: openInterestVolumeHistory_4hr,
    });
  }
);

//@desc         Update single open_interest_volume_history_4hr
//@route        PUT /api/open-interest-volume-history/4hr/:id
//@access       Privert
exports.updateOpenInterestVolumeHistory_4hrById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_4hr =
      await OpenInterestVolumeHistory_4hr.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    if (!openInterestVolumeHistory_4hr) {
      return next(
        new ErrorResponse(
          `Open interest volume history (4hr) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_4hr });
  }
);

//@desc         Delete single open_interest_volume_history_4hr
//@route        DELETE /api/open-interest-volume-history/4hr/:id
//@access       Privert
exports.deleteOpenInterestVolumeHistory_4hrById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_4hr =
      await OpenInterestVolumeHistory_4hr.findById(req.params.id);
    if (!openInterestVolumeHistory_4hr) {
      return next(
        new ErrorResponse(
          `Open interest volume history (4hr) not found with id of ${req.params.id}`,
          404
        )
      );
    }

    openInterestVolumeHistory_4hr.remove();

    res.status(200).json({ success: true, data: {} });
  }
);
