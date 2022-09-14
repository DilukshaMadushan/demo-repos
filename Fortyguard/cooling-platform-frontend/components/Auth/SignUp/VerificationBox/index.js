import React, { useState, useEffect } from "react";
import light from "./light.module.css";
import dark from "./dark.module.css";
import ReactCodeInput from "react-verification-code-input";
// import { verificationSubmit } from '../../../../../actions/Auth';
// import { resendVerification } from '../../../../../actions/Auth';
import CircularProgress from "@material-ui/core/CircularProgress";
// import { MdRefresh  } from 'react-icons/md';
// import RefreshIcon from "@material-ui/icons/Refresh";
//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { verificationSubmit } from "../../../../actions/Auth/index";

const VerificationBox = ({
  //   alert,
  verificationSubmit,
  //   resendVerification,

  auth: { registerEmail, verificationLoading, userId },
  darkTheme,
}) => {
  //OnSubmit
  const handleComplete = (inputNumbers) => {
    verificationSubmit(inputNumbers, userId);
  };

  // //on Verification resend
  // const handleResendVerification = (e) => {
  //   resendVerification(userId);
  // };

  return (
    <div className={`${darkTheme ? dark["mainDiv"] : light["mainDiv"]}`}>
      {verificationLoading ? (
        <CircularProgress />
      ) : (
        // "a"
        <div className={`${darkTheme ? dark["formDiv"] : light["formDiv"]}`}>
          <div
            className={`${
              darkTheme
                ? dark["verificationHeadingDiv"]
                : light["verificationHeadingDiv"]
            }`}
          >
            VERIFICATION CODE
          </div>
          <div
            className={`${
              darkTheme
                ? dark["verificationBoxParaDiv"]
                : light["verificationBoxParaDiv"]
            }`}
          >
            <div
              className={`${
                darkTheme
                  ? dark["verificationBoxPara"]
                  : light["verificationBoxPara"]
              }`}
            >
              Please enter the 6-digit verification code that was sent to
              <span
                className={`${
                  darkTheme
                    ? dark["verificationBoxEmailSpan"]
                    : light["verificationBoxEmailSpan"]
                }`}
              >
                {` ${registerEmail}`}
              </span>
              <div
                className={`${
                  darkTheme
                    ? dark["verificationBoxPara"]
                    : light["verificationBoxPara"]
                }`}
              >
                The code is valid for 30 minutes.
              </div>
            </div>
          </div>
          <form className={`${darkTheme ? dark["form"] : light["form"]}`}>
            <div
              className={`${darkTheme ? dark["inputDiv"] : light["inputDiv"]}`}
            >
              <ReactCodeInput onComplete={(e) => handleComplete(e)} />
            </div>
          </form>
          <div
            className={`${darkTheme ? dark["hzlineDiv"] : light["hzlineDiv"]}`}
          >
            <div
              className={`${darkTheme ? dark["hzline"] : light["hzline"]}`}
            ></div>
          </div>
          <div
            className={`${
              darkTheme ? dark["resendContainer"] : light["resendContainer"]
            }`}
          >
            {/* <RefreshIcon color="success" /> */}
            {/* <button
            onClick={() => handleResendVerification()}
            style={{
              color: "#33b18a",
              marginLeft: "2px",
              border: "2px",
              borderColor: "green",
              backgroundColor: "black",
            }}
          >
            Resend code
          </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

// VerificationBox.propTypes = {
//   verificationSubmit: PropTypes.func.isRequired,
// };
// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   alert: state.alert,
// });
// export default connect(mapStateToProps, {
//   verificationSubmit,
//   resendVerification,
// })(VerificationBox);

// export default VerificationBox;

VerificationBox.propTypes = {
  verificationSubmit: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { verificationSubmit })(
  VerificationBox
);
