import React from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TiTime } from "react-icons/ti";
import { GiHeatHaze } from "react-icons/gi";
import { BiAnalyse } from "react-icons/bi";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SensorComp = ({ common: { darkThemeState } }) => {
  return (
    <div
      className={`row m-0 mt-3 ${
        darkThemeState ? dark["bottum-div"] : light["bottum-div"]
      }`}
    >
      <div
        className={`col-md-7 row m-0 ${
          darkThemeState ? dark["bottum-left-div"] : light["bottum-left-div"]
        }`}
      >
        <div
          className={`col-6 row m-0 p-0 ${
            darkThemeState ? dark["bottum-left"] : light["bottum-left"]
          }`}
        >
          <div
            className={`col-7 m-0 p-0 ${
              darkThemeState
                ? dark["bottum-left-text-div"]
                : light["bottum-left-text-div"]
            }`}
          >
            <div
              className={`${
                darkThemeState ? dark["sensing-title"] : light["sensing-title"]
              }`}
            >
              Active Sensing
            </div>
            <div
              className={`${
                darkThemeState ? dark["desc-title"] : light["desc-title"]
              }`}
            >
              <text>DESCRIPTION</text>
            </div>
            <div
              className={`${
                darkThemeState ? dark["sensor-no"] : light["sensor-no"]
              }`}
            >
              <text
                className={`${
                  darkThemeState ? dark["mini-title"] : light["mini-title"]
                }`}
              >
                CAR:
              </text>
              &nbsp;
              <text
                className={`${
                  darkThemeState ? dark["mini-value"] : light["mini-value"]
                }`}
              >
                Chevrolet Bolt
              </text>
            </div>
            <div
              className={`${
                darkThemeState ? dark["sensor-desc"] : light["sensor-desc"]
              }`}
            >
              <text
                className={`${
                  darkThemeState ? dark["mini-title"] : light["mini-title"]
                }`}
              >
                PLATES:
              </text>
              &nbsp;
              <text
                className={`${
                  darkThemeState ? dark["mini-value"] : light["mini-value"]
                }`}
              >
                10 5 2364
              </text>
            </div>
            <div
              className={`${
                darkThemeState ? dark["sensor-desc"] : light["sensor-desc"]
              }`}
            >
              <text
                className={`${
                  darkThemeState ? dark["mini-title"] : light["mini-title"]
                }`}
              >
                DEPARTMENT:
              </text>
              &nbsp;
              <text
                className={`${
                  darkThemeState ? dark["mini-value"] : light["mini-value"]
                }`}
              >
                R & D
              </text>
            </div>
            <div
              className={`${
                darkThemeState ? dark["sensor-desc"] : light["sensor-desc"]
              }`}
            >
              <text
                className={`${
                  darkThemeState ? dark["mini-title"] : light["mini-title"]
                }`}
              >
                DISTANCE TRAVELLED:
              </text>
              &nbsp;
              <text
                className={`${
                  darkThemeState ? dark["mini-value"] : light["mini-value"]
                }`}
              >
                48 km
              </text>
            </div>
          </div>
          <div
            className={`col-5 p-0 ${
              darkThemeState
                ? dark["bottum-left-img-div"]
                : light["bottum-left-img-div"]
            }`}
          >
            <div
              className={`${
                darkThemeState ? dark["car-img-div"] : light["car-img-div"]
              }`}
            >
              <img
                className={`${
                  darkThemeState ? dark["car-img"] : light["car-img"]
                }`}
                src="./carImage.jpeg"
              />
            </div>
          </div>
        </div>
        <div
          className={`col-6 row m-0 p-3 ${
            darkThemeState ? dark["bottum-right"] : light["bottum-right"]
          }`}
        >
          <div
            className={`col-7 m-0 p-0 ${
              darkThemeState
                ? dark["bottum-right-text-div"]
                : light["bottum-right-text-div"]
            }`}
          >
            <div
              className={`${
                darkThemeState ? dark["sensor-title"] : light["sensor-title"]
              }`}
            >
              SENSOR TYPE
            </div>
            <div
              className={`${
                darkThemeState ? dark["sensor-no"] : light["sensor-no"]
              }`}
            >
              <text
                className={`${
                  darkThemeState ? dark["mini-title"] : light["mini-title"]
                }`}
              >
                NUMBER :
              </text>
              &nbsp;
              <text
                className={`${
                  darkThemeState ? dark["mini-value"] : light["mini-value"]
                }`}
              >
                124
              </text>
            </div>
            <div
              className={`${
                darkThemeState ? dark["sensor-desc"] : light["sensor-desc"]
              }`}
            >
              <text
                className={`${
                  darkThemeState ? dark["mini-title"] : light["mini-title"]
                }`}
              >
                LAST READING :
              </text>
              &nbsp;
              <text
                className={`${
                  darkThemeState ? dark["mini-value"] : light["mini-value"]
                }`}
              >
                10 Nov 2021
              </text>
            </div>
          </div>
          <div
            className={`col-5 p-0 ${
              darkThemeState
                ? dark["bottum-right-img-div"]
                : light["bottum-right-img-div"]
            }`}
          >
            <div
              className={`${
                darkThemeState
                  ? dark["sensor-img-div"]
                  : light["sensor-img-div"]
              }`}
            >
              <img
                className={`${
                  darkThemeState ? dark["sensor-img"] : light["sensor-img"]
                }`}
                src="./sensorImage.jpeg"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`col-md-5 row m-0 p-0 ${
          darkThemeState ? dark["bottum-right-div"] : light["bottum-right-div"]
        }`}
      >
        <div
          className={`col-3 p-0 ${
            darkThemeState ? dark["historic-div"] : light["historic-div"]
          }`}
        >
          <div
            className={`col-3 ${
              darkThemeState ? dark["historic"] : light["historic"]
            }`}
          >
            <div
              className={`${
                darkThemeState
                  ? dark["historic-title"]
                  : light["historic-title"]
              }`}
            >
              Historic
            </div>
            <div
              className={`${
                darkThemeState ? dark["historic-icon"] : light["historic-icon"]
              }`}
            >
              <FaRegCalendarAlt />
            </div>
          </div>
        </div>
        <div
          className={`col-3 p-0 ${
            darkThemeState ? dark["heat-div"] : light["heat-div"]
          }`}
        >
          <div
            className={`col-3 ${darkThemeState ? dark["heat"] : light["heat"]}`}
          >
            <div
              className={`${
                darkThemeState
                  ? dark["historic-title"]
                  : light["historic-title"]
              }`}
            >
              Heat
            </div>
            <div
              className={`${
                darkThemeState ? dark["historic-icon"] : light["historic-icon"]
              }`}
            >
              <GiHeatHaze />
            </div>
          </div>
        </div>
        <div
          className={`col-3 p-0 ${
            darkThemeState ? dark["time-div"] : light["time-div"]
          }`}
        >
          <div
            className={`col-3 ${darkThemeState ? dark["time"] : light["time"]}`}
          >
            <div
              className={`${
                darkThemeState
                  ? dark["historic-title"]
                  : light["historic-title"]
              }`}
            >
              Time
            </div>
            <div
              className={`${
                darkThemeState ? dark["historic-icon"] : light["historic-icon"]
              }`}
            >
              <TiTime />
            </div>
          </div>
        </div>
        <div
          className={`col-3 p-0 ${
            darkThemeState ? dark["analysis-div"] : light["analysis-div"]
          }`}
        >
          <div
            className={`col-3 ${
              darkThemeState ? dark["analysis"] : light["analysis"]
            }`}
          >
            <div
              className={`${
                darkThemeState
                  ? dark["historic-title"]
                  : light["historic-title"]
              }`}
            >
              Analysis
            </div>
            <div
              className={`${
                darkThemeState ? dark["historic-icon"] : light["historic-icon"]
              }`}
            >
              <BiAnalyse />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SensorComp.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {})(SensorComp);
