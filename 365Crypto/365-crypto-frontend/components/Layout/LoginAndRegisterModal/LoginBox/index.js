import styles from "./index.module.css";
import React, { useContext, useState, useEffect } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import { FiMail } from "react-icons/fi";
import { LoginContext } from "../../common/LoginContext";
import { setAlert } from "../../../../actions/Alert";
//cookies
import { useCookies } from "react-cookie";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  loginBoxSubmit,
  setShowForgotPasswordModal,
} from "../../../../actions/Auth";

// SET ENVIRONMENT URL
const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;

const LoginBox = ({
  auth: { loading, isAuthenticated, showForgotPasswordModal, token },
  alert,
  loginBoxSubmit,
  setShowForgotPasswordModal,
}) => {
  //cookies data
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);

  const [modalShow, isLogin, redirect, setLogin, setModalShow, setRedirect] =
    useContext(LoginContext);

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [showForgotPassword, setshowForgotPassword] = useState(false);

  //open in same tab
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_parent", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
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
  const handlex = (e) => {
    e.preventDefault();
    setShowForgotPasswordModal(true);
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

  // Handle submit events in login form
  const handleSubmit = (event) => {
    event.preventDefault();

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: "submit" })
        .then((token) => {
          //do anything you want with token

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
      <form
        className={styles.form}
        // onSubmit={e => handleSubmit(e)}
      >
        <div className="form-group ">
          <div className={`${styles["input-group"]}`}>
            <input
              //type='email'
              className={`${styles["form-control"]}`}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => handleChange(e)}
              //required
            />

            <div className={`${styles["input-group-addon"]}`}>
              <FiMail color="white" />
            </div>
          </div>
          {errors.email && <p className={styles.errors}>{errors.email}</p>}
        </div>
        <div className="form-group ">
          <div className={`${styles["input-group"]}`}>
            <input
              //type='password'
              className={`${styles["form-control"]}`}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => handleChange(e)}
              //required
            />

            <div className={`${styles["input-group-addon"]}`}>
              <HiOutlineLockClosed color="white" />
            </div>
          </div>
          {errors.password && (
            <p className={styles.errors}>{errors.password}</p>
          )}
        </div>
        <button
          className={styles.forgotpasswordtext}
          onClick={(e) => handlex(e)}
        >
          {" "}
          Forgot Password ?
        </button>

        {isButtonDisable ? (
          <button
            type="submit"
            className={styles.signinDisable}
            disabled={true}
          >
            Please Wait...
          </button>
        ) : (
          <button
            type="submit"
            className={styles.signin}
            disabled={false}
            onClick={(e) => handleSubmit(e)}
          >
            Sign in
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
          Don't you have an account ?
          <button
            onClick={() => setLogin(false)}
            style={{
              color: "#33b18a",
              marginLeft: "8px",
              border: "none",
              backgroundColor: "black",
            }}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

LoginBox.propTypes = {
  loginBoxSubmit: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  // alert: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  alert: state.alert,
});

export default connect(mapStateToProps, {
  loginBoxSubmit,
  setAlert,
  setShowForgotPasswordModal,
})(LoginBox);
