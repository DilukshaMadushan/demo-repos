const OpenInterestVolumeHistory_12hr = require("../../Models/OpenInterestVolumeHistory/OpenInterestVolumeHistory_12hr");
const asyncHandler = require("../../Middleware/async");
const ErrorResponse = require("../../Utils/errorResponse");

//@desc         Get all open_interest_volume_history_12hr
//@route        GET /api/open-interest-volume-history/12hr
//@access       Public
exports.getAllOpenInterestVolumeHistory_12hr = asyncHandler(
  async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  }
);

//@desc         Get single open_interest_volume_history_12hr
//@route        GET /api/open-interest-volume-history/12hr/:id
//@access       Public
exports.getOpenInterestVolumeHistory_12hrById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_12hr =
      await OpenInterestVolumeHistory_12hr.findById(req.params.id);
    if (!openInterestVolumeHistory_12hr) {
      return next(
        new ErrorResponse(
          `Open interest volume history (12hr) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_12hr });
  }
);

//@desc         Create new open_interest_volume_history_12hr
//@route        POST /api/open-interest-volume-history/12hr
//@access       Public
exports.createOpenInterestVolumeHistory_12hr = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_12hr =
      await OpenInterestVolumeHistory_12hr.create(req.body);
    res.status(201).json({
      success: true,
      data: openInterestVolumeHistory_12hr,
    });
  }
);

//@desc         Update single open_interest_volume_history_12hr
//@route        PUT /api/open-interest-volume-history/12hr/:id
//@access       Privert
exports.updateOpenInterestVolumeHistory_12hrById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_12hr =
      await OpenInterestVolumeHistory_12hr.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    if (!openInterestVolumeHistory_12hr) {
      return next(
        new ErrorResponse(
          `Open interest volume history (12hr) not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res
      .status(200)
      .json({ success: true, data: openInterestVolumeHistory_12hr });
  }
);

//@desc         Delete single open_interest_volume_history_12hr
//@route        DELETE /api/open-interest-volume-history/12hr/:id
//@access       Privert
exports.deleteOpenInterestVolumeHistory_12hrById = asyncHandler(
  async (req, res, next) => {
    const openInterestVolumeHistory_12hr =
      await OpenInterestVolumeHistory_12hr.findById(req.params.id);
    if (!openInterestVolumeHistory_12hr) {
      return next(
        new ErrorResponse(
          `Open interest volume history (12hr) not found with id of ${req.params.id}`,
          404
        )
      );
    }

    openInterestVolumeHistory_12hr.remove();

    res.status(200).json({ success: true, data: {} });
  }
);
