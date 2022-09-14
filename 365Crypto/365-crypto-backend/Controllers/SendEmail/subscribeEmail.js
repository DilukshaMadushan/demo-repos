// const sendEmail = require("../../Utils/sendEmail");
const asyncHandler = require('../../Middleware/async');
const SibApiV3Sdk = require('sib-api-v3-sdk');
//@desc         Send A Email
//@route        POST /api/subscribe-email
//@access       Public
exports.subscribeEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  try {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SENDINBLUE_APIKEY;

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let createDoiContact = new SibApiV3Sdk.CreateDoiContact(); // CreateDoiContact | Values to create the Double opt-in (DOI) contact

    createDoiContact.email = email;
    createDoiContact.includeListIds = [3];
    createDoiContact.templateId = 1;
    createDoiContact.redirectionUrl = 'http://requestb.in/173lyyx1';

    await apiInstance.createDoiContact(createDoiContact);

    res
      .status(200)
      .json({ success: true, data: 'verification email send successfully' });
  } catch (err) {
    console.log(err);

    return next(new ErrorResponse('contact could not be created', 500));
  }
});
