import React from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Alerts = ({ common: { darkThemeState } }) => {
  return (
    <div className={`${darkThemeState ? dark["main-div"] : light["main-div"]}`}>
      <div
        className={`${darkThemeState ? dark["text-div"] : light["text-div"]}`}
      >
        <text>Alerts</text>
      </div>
      <div
        className={`row m-0 p-0 ${
          darkThemeState ? dark["alerts-img-div"] : light["alerts-img-div"]
        }`}
      >
        <div
          className={`col-3 p-0 ${
            darkThemeState ? dark["alerts-one"] : light["alerts-one"]
          }`}
        >
          <div
            className={`row m-0 p-0 ${
              darkThemeState
                ? dark["alerts-critical"]
                : light["alerts-critical"]
            }`}
          >
            <text
              className={`${
                darkThemeState ? dark["alerts-title"] : light["alerts-title"]
              }`}
            >
              Critical
            </text>
            <text
              className={`${
                darkThemeState ? dark["alerts-no"] : light["alerts-no"]
              }`}
            >
              6
            </text>
          </div>
        </div>
        <div
          className={`col-3 p-0 ${
            darkThemeState ? dark["alerts-two"] : light["alerts-two"]
          }`}
        >
          <div
            className={`row m-0 p-0 ${
              darkThemeState ? dark["alerts-major"] : light["alerts-major"]
            }`}
          >
            <text
              className={`${
                darkThemeState ? dark["alerts-title"] : light["alerts-title"]
              }`}
            >
              Major
            </text>
            <text
              className={`${
                darkThemeState ? dark["alerts-no"] : light["alerts-no"]
              }`}
            >
              3
            </text>
          </div>
        </div>
        <div
          className={`col-3 p-0 ${
            darkThemeState ? dark["alerts-three"] : light["alerts-three"]
          }`}
        >
          <div
            className={`row m-0 p-0 ${
              darkThemeState ? dark["alerts-minor"] : light["alerts-minor"]
            }`}
          >
            <text
              className={`${
                darkThemeState ? dark["alerts-title"] : light["alerts-title"]
              }`}
            >
              Minor
            </text>
            <text
              className={`${
                darkThemeState ? dark["alerts-no"] : light["alerts-no"]
              }`}
            >
              4
            </text>
          </div>
        </div>
        <div
          className={`col-3 p-0 ${
            darkThemeState ? dark["alerts-four"] : light["alerts-four"]
          }`}
        >
          <div
            className={`row m-0 p-0 ${
              darkThemeState ? dark["alerts-war"] : light["alerts-war"]
            }`}
          >
            <text
              className={`${
                darkThemeState ? dark["alerts-title"] : light["alerts-title"]
              }`}
            >
              Warning
            </text>
            <text
              className={`${
                darkThemeState ? dark["alerts-no"] : light["alerts-no"]
              }`}
            >
              12
            </text>
          </div>
        </div>
      </div>
    </div>
  );
};

Alerts.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {})(Alerts);
