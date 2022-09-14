import React, { useContext, useState, useEffect } from "react";
import light from "./light.module.css";
import dark from "./dark.module.css";
import { FaAdjust } from "react-icons/fa";
import Link from "next/link";
import ThemeChanger from "../../Common/ThemeChanger";
import Alert from "../../Common/Alert";
import { useRouter } from "next/router";

//cookies
import { useCookies } from "react-cookie";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginBoxSubmit } from "../../../actions/Auth";

const Login = ({
  auth: { loading, isAuthenticated, token, buttonDisable },
  loginBoxSubmit,
}) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  // Destructure loginFormData data
  const { email, password } = loginFormData;

  //Form validaions
  const [errors, setErrors] = useState({});

  //disable button
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  // Handle Onchange events in login form
  const handleChange = async (event) => {
    setLoginFormData({
      ...loginFormData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle submit events in login form
  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {
      email: "",
      password: "",
    };

    if (!loginFormData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!loginFormData.password) {
      errors.password = "Password is required.";
    }

    if (errors.email.length === 0 && errors.password.length === 0) {
      loginBoxSubmit(loginFormData);
      setIsButtonDisable(true);
      setLoginFormData({
        ...loginFormData,
        email: "",
        password: "",
      });
    }
    setErrors(errors);
  };

  //open in same tab
  useEffect(() => {
    if (cookies.Logintoken) {
      router.push(`/`, null, { shallow: true });
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
              Login
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
                    htmlFor="username"
                    className={`${
                      darkTheme ? dark["label-login"] : light["label-login"]
                    }`}
                  >
                    Email
                  </label>
                </div>
                <input
                  id="email"
                  className={`${
                    darkTheme ? dark["input-login"] : light["input-login"]
                  }`}
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e)}
                />
                {errors.email && <p className={dark.errors}>{errors.email}</p>}
              </div>
              <div
                className={`${
                  darkTheme ? dark["password"] : light["password"]
                }`}
              >
                <div>
                  <label
                    htmlFor="password"
                    className={`${
                      darkTheme ? dark["label-login"] : light["label-login"]
                    }`}
                  >
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  className={`${
                    darkTheme ? dark["input-login"] : light["input-login"]
                  }`}
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                />
                {errors.password && (
                  <p className={dark.errors}>{errors.password}</p>
                )}
              </div>
              <div
                className={`${
                  darkTheme ? dark["button-div"] : light["button-div"]
                }`}
              >
                {isButtonDisable ? (
                  <button
                    className={`${
                      darkTheme ? dark["button"] : light["button"]
                    }`}
                    // onClick={e => handleSubmit(e)}
                    type="submit"
                  >
                    Please Wait...
                  </button>
                ) : (
                  <button
                    className={`${
                      darkTheme ? dark["button"] : light["button"]
                    }`}
                    onClick={(e) => handleSubmit(e)}
                    type="submit"
                  >
                    Login
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
                  Don't have an account?
                </small>
              </div>
              <div
                className={`${
                  darkTheme ? dark["signup-div"] : light["signup-div"]
                }`}
              >
                <Link href={`/sign-up`}>
                  <text
                    className={`${
                      darkTheme ? dark["signup"] : light["signup"]
                    }`}
                    // onClick={() => setLoginSignUpChange(false)}
                  >
                    Sign Up
                  </text>
                </Link>
              </div>
            </div>
          </div>
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

Login.propTypes = {
  loginBoxSubmit: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loginBoxSubmit,
})(Login);
