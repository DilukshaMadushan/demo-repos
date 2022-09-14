import React, { useState } from "react";
import GraphicalSynopsisChart from "./GraphicalSynopsisChart";
import styles from "./index.module.css";
import Map from "../Home/Map";
import TempCard from "./TempCard";
import HumCard from "./HumCard";
import CoverageCard from "./CoverageCard";
import PowerCard from "./PowerCard";
import CarSensing from "./CarSensing";
import MapComp from "./MapComp";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Sensor = ({ common: { darkThemeState } }) => {
  return (
    <div className={`${styles["mainDiv"]}`}>
      <div className={`${styles["subDiv"]}`}>
        <text className={`${styles["sensorTitleDiv"]}`}>Sensor</text>
        <div className={`${styles["grapicLocationDiv"]}`}>
          <GraphicalSynopsisChart />
          <div className={`${styles["locationDiv"]}`}>
            <div
              className={`${
                darkThemeState ? styles["lCompDiv"] : styles["lCompDivLight"]
              }`}
            >
              <div className={`${styles["lTextDiv"]}`}>
                <text className={`${styles["lTitleDiv"]}`}>Sensor</text>
              </div>
              <div className={`${styles["lMapDiv"]}`}>
                <MapComp />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles["sensorDataDiv"]}`}>
          <div className={`${styles["sensorDataTextDiv"]}`}>
            Current Sensor Data
          </div>
          <div className={`${styles["dataCardDiv"]}`}>
            <div className={`${styles["tempHumDiv"]}`}>
              <div className={`${styles["temprature"]}`}>
                <div className={`${styles["tempratureComp"]}`}>
                  <TempCard />
                </div>
              </div>
              <div className={`${styles["humidity"]}`}>
                <div className={`${styles["humidityComp"]}`}>
                  <HumCard />
                </div>
              </div>
            </div>
            <div className={`${styles["powerCoverDiv"]}`}>
              <div className={`${styles["powerDiv"]}`}>
                <div className={`${styles["powerCompDiv"]}`}>
                  <PowerCard />
                </div>
              </div>
              <div className={`${styles["coverDiv"]}`}>
                <div className={`${styles["coverCompDiv"]}`}>
                  <CoverageCard />
                </div>
              </div>
            </div>
          </div>
        </div>
        <CarSensing />
      </div>
    </div>
  );
};

Sensor.propTypes = {
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, null)(Sensor);
