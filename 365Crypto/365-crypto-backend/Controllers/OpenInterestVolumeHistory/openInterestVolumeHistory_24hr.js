const OpenInterestVolumeHistory_24hr = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_24hr");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all open_interest_volume_history_24hr
//@route        GET /api/open-interest-volume-history/24hr
//@access       Public
exports.getAllOpenInterestVolumeHistory_24hr = asyncHandler(
  async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  }
);

//@desc         Get single open_interest_volume_history_24hr
//@route        GET /api/open-interest-volume-history/24hr/:id
//@access       Public
exports.getOpenInterestVolumeHistory_24hrById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_24hr =
      await OpenInterestVolumeHistory_24hr.findById(req.params.id);
    if (!openInterestVolumeHistory_24hr) {
      return next(
        new ErrorResponse(
          `Open interest volume history (24hr) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_24hr });
  }
);

//@desc         Create new open_interest_volume_history_24hr
//@route        POST /api/open-interest-volume-history/24hr
//@access       Public
exports.createOpenInterestVolumeHistory_24hr = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_24hr =
      await OpenInterestVolumeHistory_24hr.create(req.body);
    res.status(201).json({
      success: true,
      data: openInterestVolumeHistory_24hr,
    });
  }
);

//@desc         Update single open_interest_volume_history_24hr
//@route        PUT /api/open-interest-volume-history/24hr/:id
//@access       Privert
exports.updateOpenInterestVolumeHistory_24hrById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_24hr =
      await OpenInterestVolumeHistory_24hr.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    if (!openInterestVolumeHistory_24hr) {
      return next(
        new ErrorResponse(
          `Open interest volume history (24hr) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_24hr });
  }
);

//@desc         Delete single open_interest_volume_history_24hr
//@route        DELETE /api/open-interest-volume-history/24hr/:id
//@access       Privert
exports.deleteOpenInterestVolumeHistory_24hrById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_24hr =
      await OpenInterestVolumeHistory_24hr.findById(req.params.id);
    if (!openInterestVolumeHistory_24hr) {
      return next(
        new ErrorResponse(
          `Open interest volume history (24hr) not found with id of ${req.params.id}`,
          404
        )
      );
    }

    openInterestVolumeHistory_24hr.remove();

    res.status(200).json({ success: true, data: {} });
  }
);
