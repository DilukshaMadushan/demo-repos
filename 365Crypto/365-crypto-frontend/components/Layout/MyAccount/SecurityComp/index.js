import React, { useState } from "react";
import styles from "./index.module.css";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changeUserPassword } from "../../../../actions/MyAccount/index";

// cookies
import { useCookies } from "react-cookie";

const SecurityComp = ({ changeUserPassword }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);
  const [registerFormData, setRegisterFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Destructure registerFormData data
  const { currentPassword, newPassword, confirmNewPassword } = registerFormData;

  //Form validaions
  const [errors, setErrors] = useState({});

  // Handle Onchange events in register form
  const handleChange = (event) => {
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]: event.target.value,
    });
  };

  const clear = () => {
    setRegisterFormData({
      ...registerFormData,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  // Handle submit events in register form
  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };

    if (!registerFormData.currentPassword) {
      errors.currentPassword = "Password is required.";
    } else if (registerFormData.currentPassword.length < 6) {
      errors.currentPassword = "Password is too short.";
    }
    if (!registerFormData.newPassword) {
      errors.newPassword = "Password is required.";
    } else if (registerFormData.newPassword.length < 6) {
      errors.newPassword = "Password is too short.";
    }
    if (!registerFormData.confirmNewPassword) {
      errors.confirmNewPassword = "Password is required.";
    } else if (
      registerFormData.newPassword !== registerFormData.confirmNewPassword
    ) {
      errors.confirmNewPassword = "Passwords do not match.";
    }

    if (
      errors.currentPassword.length === 0 &&
      errors.newPassword.length === 0 &&
      errors.confirmNewPassword.length === 0
    ) {
      changeUserPassword(registerFormData, cookies.Logintoken);
      clear();
    }

    setErrors(errors);
  };

  return (
    <div className={`${styles["mainDiv"]}`}>
      <div className={`${styles["titleDiv"]}`}>Change Password</div>
      <div className={`${styles["inputDiv"]}`}>
        <div className={`${styles["inputTitleDiv"]}`}>Current Password</div>
        <div className={`${styles["inputDivInput"]}`}>
          <input
            className={`${styles["input"]}`}
            type="password"
            id="currentPassword"
            name="currentPassword"
            maxlength="250"
            value={currentPassword}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        {errors.currentPassword && (
          <p className={styles.errors}>{errors.currentPassword}</p>
        )}
      </div>
      <div className={`${styles["inputDiv"]}`}>
        <div className={`${styles["inputTitleDiv"]}`}>New Password</div>
        <div className={`${styles["inputDivInput"]}`}>
          <input
            className={`${styles["input"]}`}
            type="password"
            id="newPassword"
            name="newPassword"
            maxlength="250"
            value={newPassword}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        {errors.newPassword && (
          <p className={styles.errors}>{errors.newPassword}</p>
        )}
      </div>
      <div className={`${styles["inputDiv"]}`}>
        <div className={`${styles["inputTitleDiv"]}`}>Confirm Password</div>
        <div className={`${styles["inputDivInput"]}`}>
          <input
            className={`${styles["input"]}`}
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            maxlength="250"
            value={confirmNewPassword}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        {errors.confirmNewPassword && (
          <p className={styles.errors}>{errors.confirmNewPassword}</p>
        )}
      </div>
      <div className={`${styles["buttonDiv"]}`}>
        <button
          className={`${styles["button"]}`}
          onClick={(e) => handleSubmit(e)}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

SecurityComp.propTypes = {
  changeUserPassword: PropTypes.func.isRequired,
};
// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   alert: state.alert,
// });
export default connect(null, {
  changeUserPassword,
})(SecurityComp);
