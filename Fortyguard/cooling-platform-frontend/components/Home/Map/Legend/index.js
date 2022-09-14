import React from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Legend = ({ common: { darkThemeState } }) => {
  return (
    <div className={`${darkThemeState ? dark["mainDiv"] : light["mainDiv"]}`}>
      <div
        className={`${darkThemeState ? dark["titleDiv"] : light["titleDiv"]}`}
      >
        Legend
      </div>
      <div className={`${darkThemeState ? dark["descDiv"] : light["descDiv"]}`}>
        Average Temp. (C)
      </div>
      <div className={`${darkThemeState ? dark["tempDiv"] : light["tempDiv"]}`}>
        <div
          className={`${
            darkThemeState ? dark["tempColor1"] : light["tempColor1"]
          }`}
        ></div>
        <div
          className={`${
            darkThemeState ? dark["tempRange"] : light["tempRange"]
          }`}
        >
          28.50 to 32.50
        </div>
      </div>
      <div className={`${darkThemeState ? dark["tempDiv"] : light["tempDiv"]}`}>
        <div
          className={`${
            darkThemeState ? dark["tempColor2"] : light["tempColor2"]
          }`}
        ></div>
        <div
          className={`${
            darkThemeState ? dark["tempRange"] : light["tempRange"]
          }`}
        >
          32.50 to 36.50
        </div>
      </div>
      <div className={`${darkThemeState ? dark["tempDiv"] : light["tempDiv"]}`}>
        <div
          className={`${
            darkThemeState ? dark["tempColor3"] : light["tempColor3"]
          }`}
        ></div>
        <div
          className={`${
            darkThemeState ? dark["tempRange"] : light["tempRange"]
          }`}
        >
          36.50 to 40.50
        </div>
      </div>
      <div className={`${darkThemeState ? dark["tempDiv"] : light["tempDiv"]}`}>
        <div
          className={`${
            darkThemeState ? dark["tempColor4"] : light["tempColor4"]
          }`}
        ></div>
        <div
          className={`${
            darkThemeState ? dark["tempRange"] : light["tempRange"]
          }`}
        >
          40.50 to 44.50
        </div>
      </div>
      <div className={`${darkThemeState ? dark["tempDiv"] : light["tempDiv"]}`}>
        <div
          className={`${
            darkThemeState ? dark["tempColor5"] : light["tempColor5"]
          }`}
        ></div>
        <div
          className={`${
            darkThemeState ? dark["tempRange"] : light["tempRange"]
          }`}
        >
          44.50 to 48.50
        </div>
      </div>
      <div className={`${darkThemeState ? dark["tempDiv"] : light["tempDiv"]}`}>
        <div
          className={`${
            darkThemeState ? dark["tempColor6"] : light["tempColor6"]
          }`}
        ></div>
        <div
          className={`${
            darkThemeState ? dark["tempRange"] : light["tempRange"]
          }`}
        >
          48.50 to 52.50
        </div>
      </div>
    </div>
  );
};

Legend.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {})(Legend);
