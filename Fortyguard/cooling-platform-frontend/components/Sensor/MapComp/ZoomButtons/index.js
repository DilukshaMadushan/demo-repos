import React from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import { HiZoomIn } from "react-icons/hi";
import { HiZoomOut } from "react-icons/hi";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ZoomButtons = ({ common: { darkThemeState }, zoom, setZoom }) => {
  return (
    <div className={`${darkThemeState ? dark["main-div"] : light["main-div"]}`}>
      <div
        className={`${darkThemeState ? dark["ZoomIn"] : light["ZoomIn"]}`}
        onClick={() => setZoom(zoom + 1)}
      >
        <HiZoomIn />
      </div>
      <div
        className={`${darkThemeState ? dark["ZoomOut"] : light["ZoomOut"]}`}
        onClick={() => setZoom(zoom - 1)}
      >
        <HiZoomOut />
      </div>
    </div>
  );
};

ZoomButtons.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {})(ZoomButtons);
