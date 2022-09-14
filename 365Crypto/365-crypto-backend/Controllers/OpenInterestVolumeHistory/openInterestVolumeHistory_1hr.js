const OpenInterestVolumeHistory_1hr = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_1hr");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all open_interest_volume_history_1hr
//@route        GET /api/open-interest-volume-history/1hr
//@access       Public
exports.getAllOpenInterestVolumeHistory_1hr = asyncHandler(
  async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  }
);

//@desc         Get single open_interest_volume_history_1hr
//@route        GET /api/open-interest-volume-history/1hr/:id
//@access       Public
exports.getOpenInterestVolumeHistory_1hrById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_1hr =
      await OpenInterestVolumeHistory_1hr.findById(req.params.id);
    if (!openInterestVolumeHistory_1hr) {
      return next(
        new ErrorResponse(
          `Open interest volume history (1hr) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_1hr });
  }
);

//@desc         Create new open_interest_volume_history_1hr
//@route        POST /api/open-interest-volume-history/1hr
//@access       Public
exports.createOpenInterestVolumeHistory_1hr = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_1hr =
      await OpenInterestVolumeHistory_1hr.create(req.body);
    res.status(201).json({
      success: true,
      data: openInterestVolumeHistory_1hr,
    });
  }
);

//@desc         Update single open_interest_volume_history_1hr
//@route        PUT /api/open-interest-volume-history/1hr/:id
//@access       Privert
exports.updateOpenInterestVolumeHistory_1hrById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_1hr =
      await OpenInterestVolumeHistory_1hr.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    if (!openInterestVolumeHistory_1hr) {
      return next(
        new ErrorResponse(
          `Open interest volume history (1hr) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_1hr });
  }
);

//@desc         Delete single open_interest_volume_history_1hr
//@route        DELETE /api/open-interest-volume-history/1hr/:id
//@access       Privert
exports.deleteOpenInterestVolumeHistory_1hrById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_1hr =
      await OpenInterestVolumeHistory_1hr.findById(req.params.id);
    if (!openInterestVolumeHistory_1hr) {
      return next(
        new ErrorResponse(
          `Open interest volume history (1hr) not found with id of ${req.params.id}`,
          404
        )
      );
    }

    openInterestVolumeHistory_1hr.remove();

    res.status(200).json({ success: true, data: {} });
  }
);
