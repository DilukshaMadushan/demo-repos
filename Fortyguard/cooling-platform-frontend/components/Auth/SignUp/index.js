import React, { useState, useEffect } from "react";
import light from "./light.module.css";
import dark from "./dark.module.css";
import { FaAdjust } from "react-icons/fa";
import Link from "next/link";
import ThemeChanger from "../../Common/ThemeChanger";
import Alert from "../../Common/Alert";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { setToOppositeTheme } from "../../actions/Common/index";
import { registerBoxSubmit } from "../../../actions/Auth/index";
import VerificationBox from "./VerificationBox";

//cookies
import { useCookies } from "react-cookie";

const SignUp = ({
  setLoginSignUpChange,
  registerBoxSubmit,
  auth: { buttonDisable, showVerificationModel, isAuthenticated, token },
  loading,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);
  const [darkTheme, setDarkTheme] = useState(true);

  const handleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const [registerFormData, setRegisterFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  // Handle submit events in register form
  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    } else if (registerFormData.password !== registerFormData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (
      errors.fullName.length === 0 &&
      errors.email.length === 0 &&
      errors.password.length === 0 &&
      errors.confirmPassword.length === 0
    ) {
      setIsButtonDisable(true);
      registerBoxSubmit(registerFormData);
      setRegisterFormData({
        ...registerFormData,
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }

    setErrors(errors);
  };

  //open in same tab
  useEffect(() => {
    if (cookies.Logintoken) {
      window.location.replace("http://localhost:3000");
    }
  }, [cookies.Logintoken]);

  //UseEffects
  useEffect(() => {
    if (!loading && isAuthenticated) {
      setCookie("Logintoken", token, { path: "/" });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (buttonDisable === false) {
      setIsButtonDisable(false);
    }
  }, [buttonDisable]);

  return (
    <div className={`${darkTheme ? dark["mainDiv"] : light["mainDiv"]}`}>
      <Alert />
      <div className={`${darkTheme ? dark["upperDiv"] : light["upperDiv"]}`}>
        <img
          className={`${
            darkTheme ? dark["background-image"] : light["background-image"]
          }`}
          src={darkTheme ? "./background.jpg" : "./background_light.jpg"}
        />

        <div className={`${darkTheme ? dark["formDiv"] : light["formDiv"]}`}>
          {showVerificationModel === true ? (
            <div
              className={`${
                darkTheme ? dark["verifyDiv"] : light["verifyDiv"]
              }`}
            >
              <VerificationBox darkTheme={darkTheme} />
            </div>
          ) : (
            <div
              className={`${
                darkTheme ? dark["container-login"] : light["container-login"]
              }`}
            >
              <div
                className={`${
                  darkTheme ? dark["title-site"] : light["title-site"]
                }`}
              >
                <img
                  className={`${darkTheme ? dark["logo"] : light["logo"]}`}
                  src="fortyguard-logo.png"
                />
              </div>
              <div
                className={`${
                  darkTheme ? dark["title-login"] : light["title-login"]
                }`}
              >
                Sign Up
                <text
                  className={`${
                    darkTheme ? dark["login-dot"] : light["login-dot"]
                  }`}
                >
                  .
                </text>
              </div>

              <div
                className={`${
                  darkTheme
                    ? dark["form-wrapper-login"]
                    : light["form-wrapper-login"]
                }`}
              >
                <div
                  className={`${
                    darkTheme ? dark["username-login"] : light["username-login"]
                  }`}
                >
                  <div>
                    <label
                      className={`${
                        darkTheme ? dark["label-login"] : light["label-login"]
                      }`}
                    >
                      Full Name
                    </label>
                  </div>
                  <input
                    className={`${
                      darkTheme ? dark["input-login"] : light["input-login"]
                    }`}
                    type="text"
                    required
                    name="fullName"
                    maxlength="250"
                    value={fullName}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.fullName && (
                    <p className={dark.errors}>{errors.fullName}</p>
                  )}
                </div>

                <div
                  className={`${
                    darkTheme ? dark["username-login"] : light["username-login"]
                  }`}
                >
                  <div>
                    <label
                      className={`${
                        darkTheme ? dark["label-login"] : light["label-login"]
                      }`}
                    >
                      Email
                    </label>
                  </div>
                  <input
                    className={`${
                      darkTheme ? dark["input-login"] : light["input-login"]
                    }`}
                    type="email"
                    required
                    name="email"
                    value={email}
                    maxlength="250"
                    onChange={(e) => {
                      handleChange(e);
                      // handleEmailChange(e);
                    }}
                  />
                  {errors.email && (
                    <p className={dark.errors}>{errors.email}</p>
                  )}
                </div>

                <div
                  className={`${
                    darkTheme ? dark["username-login"] : light["username-login"]
                  }`}
                >
                  <div>
                    <label
                      className={`${
                        darkTheme ? dark["label-login"] : light["label-login"]
                      }`}
                    >
                      Password
                    </label>
                  </div>
                  <input
                    className={`${
                      darkTheme ? dark["input-login"] : light["input-login"]
                    }`}
                    type="password"
                    required
                    name="password"
                    maxlength="250"
                    value={password}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.password && (
                    <p className={dark.errors}>{errors.password}</p>
                  )}
                </div>

                <div
                  className={`${
                    darkTheme
                      ? dark["username-login-bot"]
                      : light["username-login-bot"]
                  }`}
                >
                  <div>
                    <label
                      className={`${
                        darkTheme ? dark["label-login"] : light["label-login"]
                      }`}
                    >
                      Confirm Password
                    </label>
                  </div>
                  <input
                    className={`${
                      darkTheme ? dark["input-login"] : light["input-login"]
                    }`}
                    type="password"
                    required
                    name="confirmPassword"
                    maxlength="250"
                    value={confirmPassword}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.confirmPassword && (
                    <p className={dark.errors}>{errors.confirmPassword}</p>
                  )}
                </div>

                <div
                  className={`${
                    darkTheme ? dark["button-div"] : light["button-div"]
                  }`}
                >
                  {isButtonDisable ? (
                    <button
                      // onClick={() => handleSubmit()}
                      className={`${
                        darkTheme ? dark["button"] : light["button"]
                      }`}
                      type="submit"
                    >
                      Please Wait...
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleSubmit(e)}
                      className={`${
                        darkTheme ? dark["button"] : light["button"]
                      }`}
                      type="submit"
                    >
                      Sign Up
                    </button>
                  )}
                </div>

                <div
                  className={`${
                    darkTheme ? dark["check-login"] : light["check-login"]
                  }`}
                >
                  <small
                    className={`${
                      darkTheme
                        ? dark["keepmeloggedin-login"]
                        : light["keepmeloggedin-login"]
                    }`}
                  >
                    Already have an account?
                  </small>
                </div>
                <div
                  className={`${
                    darkTheme ? dark["signup-div"] : light["signup-div"]
                  }`}
                >
                  <Link href={`/login`}>
                    <text
                      className={`${
                        darkTheme ? dark["signup"] : light["signup"]
                      }`}
                      // onClick={() => setLoginSignUpChange(true)}
                    >
                      Login
                    </text>
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div
            className={`${
              darkTheme ? dark["theme-change"] : light["theme-change"]
            }`}
          >
            <div
              className={`${
                darkTheme ? dark["theme-icon"] : light["theme-icon"]
              }`}
              onClick={handleTheme}
            >
              <ThemeChanger />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  registerBoxSubmit: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerBoxSubmit })(SignUp);
