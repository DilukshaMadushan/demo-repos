import React from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";

import CommonButton from "@shared/CommonButton";
import { SET_LOGIN_MODAL } from "@actions/types";

const TopNavBar = () => {
  // Show or Hide Login Modal.
  const dispatch = useDispatch();
  const loginModal = useSelector((state) => state.site.loginModal);

  const toggleLoginModal = () => {
    dispatch({ type: SET_LOGIN_MODAL, payload: !loginModal });
  };

  return (
    <div className={styles.topNavContainer}>
      <div className={styles.topNavBar}></div>

      <div className={styles.logoContainer}>
        <div className={styles.logoImageContainer}>
          <Image
            className={styles.image}
            src="/yoy.png"
            alt="YOY"
            layout="fill"
          />
        </div>
      </div>

      <div className={styles.loginButtonContainer} onClick={toggleLoginModal}>
        <CommonButton title={"Iniciar sesión"} />
      </div>
    </div>
  );
};

export default TopNavBar;
