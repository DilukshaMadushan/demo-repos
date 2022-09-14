import React from "react";
import styles from "./index.module.css";

const index = () => {
  return (
    <div className={`${styles["sensorDataDiv"]}`}>
      <div className={`${styles["sensorDataTextDiv"]}`}>
        Current Sensor Data
      </div>
      <div className={`${styles["dataCardDiv"]}`}>
        <div className={`${styles["tempHumDiv"]}`}>
          <div className={`${styles["temprature"]}`}>
            <div className={`${styles["tempratureComp"]}`}></div>
          </div>
          <div className={`${styles["humidity"]}`}>
            <div className={`${styles["humidityComp"]}`}></div>
          </div>
        </div>
        <div className={`${styles["powerCoverDiv"]}`}>
          <div className={`${styles["powerDiv"]}`}>
            <div className={`${styles["powerCompDiv"]}`}></div>
          </div>
          <div className={`${styles["coverDiv"]}`}>
            <div className={`${styles["coverCompDiv"]}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
