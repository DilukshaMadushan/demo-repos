import styles from "./index.module.css";
import React, { useContext, useState, useEffect } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import { FiUser, FiMail } from "react-icons/fi";
import { LoginContext } from "../../common/LoginContext";
import { registerBoxSubmit } from "../../../../actions/Auth";
import VerificationBox from "./VerificationBox";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { subscriptionSubmit } from "../../../../actions/Home/index";
import { getPromotionTickState } from "../../../../actions/MyAccount/index";

//Material UI imports
import { grey, green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

//cookies
import { useCookies } from "react-cookie";

// SET ENVIRONMENT URL
const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;

const RegisterBox = ({
  auth: { loading, isAuthenticated, showVerificationModel, token },
  subscriptionSubmit,
  alert,
  registerBoxSubmit,
  myAccount: { subscriptionState },
  getPromotionTickState,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);
  const [modalShow, isLogin, redirect, setLogin, setModalShow, setRedirect] =
    useContext(LoginContext);
  const [subscriptionEmail, setSubscriptionEmail] = useState("");
  const [checkBox, setCheckBox] = useState(false);

  const handleEmailChange = (event) => {
    setSubscriptionEmail(event.target.value);
  };

  const [registerFormData, setRegisterFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //open in same tab
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_parent", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  //checkbox
  const [isChecked, setIsChecked] = useState(false);

  // Destructure registerFormData data
  const { fullName, email, password, confirmPassword } = registerFormData;

  //Form validaions
  const [errors, setErrors] = useState({});

  //disable button
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  // Handle Onchange events in register form
  const handleChange = (event) => {
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]: event.target.value,
    });
  };

  //Checkbox Onchange event
  const checkboxHandleChange = (event) => {
    setIsChecked(event.target.checked);
  };

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

  // Handle submit events in register form
  const handleSubmit = (event) => {
    event.preventDefault();

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: "submit" })
        .then((token) => {
          //do anything you want with token

          const errors = {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            checkbox: "",
          };

          if (!registerFormData.fullName) {
            errors.fullName = "Name is required.";
          } else if (/[^a-zA-Z\ ]/.test(registerFormData.fullName)) {
            errors.fullName =
              "Full Name only contain alphabetic characters and spaces.";
          }
          if (!registerFormData.email) {
            errors.email = "Email is required.";
          } else if (!/\S+@\S+\.\S+/.test(registerFormData.email)) {
            errors.email = "Email is invalid.";
          }
          if (!registerFormData.password) {
            errors.password = "Password is required.";
          } else if (registerFormData.password.length < 6) {
            errors.password = "Password is too short.";
          }
          if (!registerFormData.confirmPassword) {
            errors.confirmPassword = "Password is required.";
          } else if (
            registerFormData.password !== registerFormData.confirmPassword
          ) {
            errors.confirmPassword = "Passwords do not match.";
          }

          if (!isChecked) {
            errors.checkbox =
              "Please accept the terms & conditions to proceed.";
          }

          if (
            errors.fullName.length === 0 &&
            errors.email.length === 0 &&
            errors.password.length === 0 &&
            errors.confirmPassword.length === 0 &&
            errors.checkbox.length === 0
          ) {
            setIsButtonDisable(true);
            registerBoxSubmit(registerFormData, subscriptionState);
            if (checkBox === true) {
              subscriptionSubmit(subscriptionEmail);
            }
          }

          setErrors(errors);
        });
    });
  };

  //UseEffects
  useEffect(() => {
    if (!loading && isAuthenticated) {
      setModalShow(false);
      setCookie("Logintoken", token, { path: "/" });
      if (redirect.status === true) {
        openInNewTab(redirect.url);
        setRedirect({ status: false });
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setIsButtonDisable(false);
  }, [alert]);

  return (
    <div className="container-fluid">
      {showVerificationModel ? (
        <div className={styles.verificationBoxDiv}>
          <VerificationBox />
        </div>
      ) : (
        <form
          className={styles.form}
          // onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-group ">
            <div class={`${styles["input-group"]}`}>
              <input
                //type='text'
                className={`${styles["form-control"]}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Full Name"
                name="fullName"
                maxlength="250"
                value={fullName}
                onChange={(e) => handleChange(e)}
              />
              <div className={`${styles["input-group-addon"]}`}>
                <FiUser color="white" />
              </div>
            </div>
            {errors.fullName && (
              <p className={styles.errors}>{errors.fullName}</p>
            )}
          </div>
          <div className="form-group ">
            <div class={`${styles["input-group"]}`}>
              <input
                //type='email'
                className={`${styles["form-control"]}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
                name="email"
                value={email}
                //required
                onChange={(e) => {
                  handleChange(e);
                  handleEmailChange(e);
                }}
                value={subscriptionEmail}
              />
              <div className={`${styles["input-group-addon"]}`}>
                <FiMail color="white" />
              </div>
            </div>
            {errors.email && <p className={styles.errors}>{errors.email}</p>}
          </div>
          <div className="form-group ">
            <div class={`${styles["input-group"]}`}>
              <input
                type="password"
                className={`${styles["form-control"]}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Password"
                name="password"
                maxlength="250"
                value={password}
                //required
                onChange={(e) => handleChange(e)}
              />
              <div className={`${styles["input-group-addon"]}`}>
                <HiOutlineLockClosed color="white" />
              </div>
            </div>
            {errors.password && (
              <p className={styles.errors}>{errors.password}</p>
            )}
          </div>
          <div className="form-group ">
            <div class={`${styles["input-group"]}`}>
              <input
                type="password"
                className={`${styles["form-control"]}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Confirm Password"
                name="confirmPassword"
                maxlength="250"
                value={confirmPassword}
                //required
                onChange={(e) => handleChange(e)}
              />
              <div className={`${styles["input-group-addon"]}`}>
                <HiOutlineLockClosed color="white" />
              </div>
            </div>
            {errors.confirmPassword && (
              <p className={styles.errors}>{errors.confirmPassword}</p>
            )}
          </div>
          <div className={styles.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  icon={
                    <RadioButtonUncheckedOutlinedIcon
                      style={{ color: grey[50], fontSize: 17 }}
                      fontSize="small"
                    />
                  }
                  checkedIcon={
                    <CheckCircleIcon
                      style={{ color: green[500], fontSize: 17 }}
                    />
                  }
                  name="checkedH"
                  onChange={(e) => checkboxHandleChange(e)}
                />
              }
              style={{ margin: "2px" }}
            />

            <p
              style={{
                color: "white",
                fontSize: "12px",
                marginTop: "12px",
                marginLeft: "1px",
              }}
            >
              I have read and agreed to{" "}
              <a href="/terms-of-services" target="_blank">
                <span style={{ color: "#33b18a" }}>Terms of Service</span>
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" target="_blank">
                <span style={{ color: "#33b18a" }}>Privacy Policy</span>
              </a>{" "}
              <div>
                {errors.checkbox && (
                  <p className={styles.checkboxerrors}>{errors.checkbox}</p>
                )}
              </div>
            </p>
          </div>

          <div className={styles.checkbox2}>
            <FormControlLabel
              control={
                <Checkbox
                  icon={
                    <RadioButtonUncheckedOutlinedIcon
                      style={{ color: grey[50], fontSize: 17 }}
                      fontSize="small"
                    />
                  }
                  checkedIcon={
                    <CheckCircleIcon
                      style={{ color: green[500], fontSize: 17 }}
                    />
                  }
                  name="checkedH"
                />
              }
              style={{ margin: "2px" }}
              onClick={() => {
                setCheckBox(!checkBox);
                getPromotionTickState(!subscriptionState);
              }}
            />

            <p
              style={{
                color: "white",
                fontSize: "12px",
                marginTop: "12px",
                marginLeft: "1px",
              }}
            >
              I agree to recieve promotions and deals about crypto trading
            </p>
          </div>
          {isButtonDisable ? (
            <button
              //type='submit'
              className={styles.signupDisable}
              disabled={true}
            >
              Please Wait...
            </button>
          ) : (
            <button
              //type='submit'
              className={styles.signup}
              disabled={false}
              onClick={(e) => handleSubmit(e)}
            >
              Sign up
            </button>
          )}
          <p
            style={{
              color: "white",
              fontSize: "12px",
              marginTop: "12px",
              textAlign: "center",
            }}
          >
            Have an account ?
            <button
              onClick={() => setLogin(true)}
              style={{
                color: "#33b18a",
                marginLeft: "8px",
                border: "none",
                backgroundColor: "black",
              }}
            >
              Sign in
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

RegisterBox.propTypes = {
  registerBoxSubmit: PropTypes.func.isRequired,
  subscriptionSubmit: PropTypes.func.isRequired,
  getPromotionTickState: PropTypes.func.isRequired,
  myAccount: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  alert: state.alert,
  myAccount: state.myAccount,
});
export default connect(mapStateToProps, {
  registerBoxSubmit,
  subscriptionSubmit,
  getPromotionTickState,
})(RegisterBox);
