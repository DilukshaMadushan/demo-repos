import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reportIssueSubmit } from "../../../../actions/ReportIssue";
import { successFalseChange } from "../../../../actions/ReportIssue";

// SET ENVIRONMENT URL
const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;

const ReportIssue = ({
  ReportIssue: { success },
  reportIssueSubmit,
  setOpen,
  successFalseChange,
}) => {
  const [reportIssueData, setReportIssueData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  // Destructure loginFormData data
  const { email, subject, message } = reportIssueData;

  //Form validaions
  const [errors, setErrors] = useState({});

  //disable button
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  const handleChange = async (event) => {
    setReportIssueData({
      ...reportIssueData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (success === true) {
      setOpen(false);
      successFalseChange(false);
    }
  }, [success]);

  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    // load the script by passing the URL
    loadScriptByURL(
      "recaptcha-key",
      `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`,
      function () {
        console.log("Script loaded!");
      }
    );
  }, []);

  const handleOnClick = () => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: "submit" })
        .then((token) => {
          handleSubmit();
        });
    });
  };

  // Handle submit events in submit form
  const handleSubmit = () => {
    const errors = {
      email: "",
      subject: "",
      message: "",
    };

    if (!reportIssueData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(reportIssueData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!reportIssueData.subject) {
      errors.subject = "Subject is required.";
    }
    if (!reportIssueData.subject) {
      errors.message = "message is required.";
    }

    if (
      errors.email.length === 0 &&
      errors.subject.length === 0 &&
      errors.message.length === 0
    ) {
      setIsButtonDisable(true);
      reportIssueSubmit(reportIssueData);
    }

    setErrors(errors);
  };

  return (
    <div className={styles.modalbody}>
      <div className={styles.title}>Report an issue</div>
      <div className="container-fluid">
        <div className={styles.form}>
          <div className="form-group ">
            <div className={`${styles["input-group"]}`}>
              <input
                className={`${styles["form-control"]}`}
                type="email"
                placeholder="Your Email"
                value={email}
                name="email"
                maxLength="50"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            {errors.email && <p className={styles.errors}>{errors.email}</p>}
          </div>
          <div className="form-group ">
            <div className={`${styles["input-group"]}`}>
              <input
                className={`${styles["form-control"]}`}
                placeholder="Subject"
                value={subject}
                name="subject"
                maxLength="100"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            {errors.subject && (
              <p className={styles.errors}>{errors.subject}</p>
            )}
          </div>
          <div className="form-group-description ">
            <div className={`${styles["input-group-description"]}`}>
              <textarea
                className={`${styles["form-control-description"]}`}
                placeholder="Description"
                name="message"
                value={message}
                type="message"
                maxLength="1000"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            {errors.message && (
              <p className={styles.errors}>{errors.message}</p>
            )}
          </div>
          <div className={`${styles["submit-div"]}`}>
            {isButtonDisable ? (
              <button
                className={`${styles["wait-primaryButton"]}`}
                disabled={true}
              >
                Please Wait...
              </button>
            ) : (
              <button
                className={`${styles["primaryButton"]}`}
                onClick={() => handleOnClick()}
                disabled={false}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ReportIssue.propTypes = {
  reportIssueSubmit: PropTypes.func.isRequired,
  successFalseChange: PropTypes.func.isRequired,
  ReportIssue: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  ReportIssue: state.ReportIssue,
});

export default connect(mapStateToProps, {
  reportIssueSubmit,
  successFalseChange,
})(ReportIssue);
