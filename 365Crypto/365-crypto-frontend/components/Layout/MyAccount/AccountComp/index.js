import React, { useState } from "react";
import styles from "./index.module.css";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changeUserDetails } from "../../../../actions/MyAccount/index";

// cookies
import { useCookies } from "react-cookie";

const AccountComp = ({
  changeUserDetails,
  myAccount: { userEmail, userName },
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);
  const [registerFormData, setRegisterFormData] = useState({
    fullName: userName,
    email: userEmail,
  });

  // Destructure registerFormData data
  const { fullName, email } = registerFormData;

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
      fullName: "",
      email: "",
    });
  };

  // Handle submit events in register form
  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {
      fullName: "",
      email: "",
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
    if (errors.fullName.length === 0 && errors.email.length === 0) {
      changeUserDetails(registerFormData, cookies.Logintoken);
      clear();
    }

    setErrors(errors);
  };

  return (
    <div className={`${styles["mainDiv"]}`}>
      <div className={`${styles["titleDiv"]}`}>Personal Information</div>
      <div className={`${styles["inputDiv"]}`}>
        <div className={`${styles["inputTitleDiv"]}`}>Full Name</div>
        <div className={`${styles["inputDivInput"]}`}>
          <input
            className={`${styles["input"]}`}
            placeholder="Full Name"
            id="exampleInputName"
            name="fullName"
            maxlength="250"
            value={fullName}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        {errors.fullName && <p className={styles.errors}>{errors.fullName}</p>}
      </div>
      <div className={`${styles["inputDiv"]}`}>
        <div className={`${styles["inputTitleDiv"]}`}>Email Address</div>
        <div className={`${styles["inputDivInput"]}`}>
          <input
            className={`${styles["input"]}`}
            placeholder="Example@gmail.com"
            id="exampleInputEmail"
            name="email"
            value={email}
            required
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        {errors.email && <p className={styles.errors}>{errors.email}</p>}
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

AccountComp.propTypes = {
  changeUserDetails: PropTypes.func.isRequired,
  myAccount: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  myAccount: state.myAccount,
  // alert: state.alert,
});
export default connect(mapStateToProps, {
  changeUserDetails,
})(AccountComp);
