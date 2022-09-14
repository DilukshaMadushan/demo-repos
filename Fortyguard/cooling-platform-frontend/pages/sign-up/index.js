import React from "react";
import styles from "./index.module.css";
import SignUp from "../../components/Auth/SignUp";

const SignUpPage = () => {
  return (
    <div className={`${styles["main-div"]}`}>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
