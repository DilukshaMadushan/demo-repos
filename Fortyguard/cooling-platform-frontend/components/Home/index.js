import React from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import { IoCaretDown } from "react-icons/io5";
import { MdDownloadForOffline } from "react-icons/md";
import { IoMdCloudCircle } from "react-icons/io";
import TimeDropDownBtn from "./TempDropDown";
import WindRoseChart from "./WindRoseChart";
import Alerts from "./Alerts";
import Map from "./Map";
import TempLiveSite from "./TempLiveSite";
import SensorComp from "./SensorComp";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DateDropdown from "./DateDropdown";

const Home = ({ common: { darkThemeState } }) => {
  return (
    <div className={`${darkThemeState ? dark["main-div"] : light["main-div"]}`}>
      <div
        className={`${darkThemeState ? dark["upper-div"] : light["upper-div"]}`}
      >
        <div
          className={`${darkThemeState ? dark["home-div"] : light["home-div"]}`}
        >
          Home
        </div>
        <div
          className={`${
            darkThemeState ? dark["dropdown-div"] : light["dropdown-div"]
          }`}
        >
          <div
            className={`${
              darkThemeState ? dark["dropdown"] : light["dropdown"]
            }`}
          >
            <div
              className={`${
                darkThemeState ? dark["temp-dropdown"] : light["temp-dropdown"]
              }`}
            >
              <TimeDropDownBtn />
            </div>
            <div
              className={`${
                darkThemeState ? dark["date-dropdown"] : light["date-dropdown"]
              }`}
            >
              <DateDropdown />
            </div>
          </div>
          <div
            className={`${
              darkThemeState ? dark["download-div"] : light["download-div"]
            }`}
          >
            <div
              className={`${
                darkThemeState ? dark["download"] : light["download"]
              }`}
            >
              <MdDownloadForOffline />
            </div>
            <div
              className={`${
                darkThemeState
                  ? dark["download-cloud"]
                  : light["download-cloud"]
              }`}
            >
              <IoMdCloudCircle />
            </div>
          </div>
        </div>
        <div
          className={`row m-0 p-0 ${
            darkThemeState ? dark["map-div"] : light["map-div"]
          }`}
        >
          <div
            className={`col-md-8 m-0 ${
              darkThemeState ? dark["left-div"] : light["left-div"]
            }`}
          >
            <Map />
          </div>
          <div
            className={`col-md-4 m-0 p-0 ${
              darkThemeState ? dark["right-div"] : light["right-div"]
            }`}
          >
            <div
              className={`${
                darkThemeState
                  ? dark["right-first-div"]
                  : light["right-first-div"]
              }`}
            >
              <WindRoseChart />
            </div>
            <div
              className={`${
                darkThemeState
                  ? dark["right-middle-div"]
                  : light["right-middle-div"]
              }`}
            >
              <TempLiveSite />
            </div>
            <div
              className={`${
                darkThemeState ? dark["alerts-div"] : light["alerts-div"]
              }`}
            >
              <Alerts />
            </div>
          </div>
        </div>
        <div>
          <SensorComp />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {})(Home);
