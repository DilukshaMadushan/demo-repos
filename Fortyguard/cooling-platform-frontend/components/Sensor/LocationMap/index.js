import React from "react";
import { Fab } from "@material-ui/core";
import styles from "./index.module.css";
import Map from "../../Home/Map";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const index = ({ common: { darkThemeState } }) => {
  return (
    <div className={`${styles["locationDiv"]}`}>
      <div
        className={
          darkThemeState
            ? `${styles["lCompDiv"]}`
            : `${styles["lCompDivLight"]}`
        }
      >
        <div className={`${styles["lTextDiv"]}`}>
          <text className={`${styles["lTitleDiv"]}`}>Sensor</text>
        </div>
        <div className={`${styles["lMapDiv"]}`}>
          <Map />
        </div>
      </div>
    </div>
  );
};

index.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {})(index);
