import React from "react";
import styles from "./index.module.css";
import Login from "../../components/Auth/Login";

const LoginPage = () => {
  return (
    <div className={`${styles["main-div"]}`}>
      <Login />
    </div>
  );
};

export default LoginPage;
