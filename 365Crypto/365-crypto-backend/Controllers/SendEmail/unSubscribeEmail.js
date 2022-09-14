const asyncHandler = require("../../Middleware/async");
const SibApiV3Sdk = require("sib-api-v3-sdk");

//@desc         unsubscribe Email
//@source       sending blue
//@route        POST /api/unsubscribe-email
//@access       Public
exports.unSubscribeEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  try {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.SENDINBLUE_APIKEY;

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    await apiInstance.deleteContact(email);

    res
      .status(200)
      .json({ success: true, data: "contact unsubscribed successfully" });
  } catch (err) {
    console.log(err);

    return next(
      new ErrorResponse(
        "contact could not be unsubscribe or already unsubscribed",
        500
      )
    );
  }
});
