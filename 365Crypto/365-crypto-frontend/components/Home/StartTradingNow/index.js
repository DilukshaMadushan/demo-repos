import React, { useContext } from "react";
import styles from "./StartTradingNow.module.css";
import PrimaryButton from "../UI/PrimaryButton";
import { LoginContext } from "../../Layout/common/LoginContext";
import LoginAndRegisterModal from "../../Layout/LoginAndRegisterModal";
import Image from "next/image";

const StartTradingNow = () => {
  const [modalShow, isLogin, redirect, setLogin, setModalShow, setRedirect] =
    useContext(LoginContext);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setModalShow(true);
    setLogin(false);
  };
  return (
    <div className={styles.mainDiv}>
      {/* <div className={styles.cardDiv}> */}
      <div className={styles.startTradingNowCard}>
        <div className={styles.upperDiv}>
          <div className={styles.image}>
            <div className={styles.img}>
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image
                  src="/starttradingnow.png"
                  alt="Get Crypto Analysis"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.lowerDiv}>
          <div className={styles.largeLabelDiv}>
            <div className={styles.largeLabel}>Get Crypto Analysis</div>
          </div>
          <div className={styles.smallLabelDiv}>
            <div className={styles.smallLabel}>Create a 365Crypto account</div>
          </div>
          <div className={styles.startNowButtonDiv}>
            <button className={styles.startNowBtn} onClick={handleLoginClick}>
              Start Now
            </button>
            {modalShow && (
              <LoginAndRegisterModal show={modalShow} isLogin={isLogin} />
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default StartTradingNow;
