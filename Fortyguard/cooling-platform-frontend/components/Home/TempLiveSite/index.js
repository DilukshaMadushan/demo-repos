import React, { useEffect } from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import { HiSun } from "react-icons/hi";
import { FaRegFrown } from "react-icons/fa";
import { HiSwitchHorizontal } from "react-icons/hi";
import { MdWaterDrop } from "react-icons/md";
import { MdBrightness6 } from "react-icons/md";
import {getWeatherDetails} from '../../../actions/Common';

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const TempLiveSite = ({ common: { darkThemeState }, map , getWeatherDetails}) => {

  useEffect(()=>{
    getWeatherDetails(map.searchedCity.lat,map.searchedCity.lg);
  },[map.searchedCity])

  return (
    <div className={`${darkThemeState ? dark["main-div"] : light["main-div"]}`}>
      <div
        className={`${darkThemeState ? dark["text-div"] : light["text-div"]}`}
      >
        <text
          className={`${
            darkThemeState ? dark["blue-text"] : light["blue-text"]
          }`}
        >
          Temperature.&nbsp;
        </text>
        <text>Live Site</text>
      </div>
      <div
        className={`${
          darkThemeState ? dark["temp-img-div"] : light["temp-img-div"]
        }`}
      >
        <div
          className={`row m-0 ${
            darkThemeState ? dark["temp-top-div"] : light["temp-top-div"]
          }`}
        >
          <div
            className={`col-4 ${
              darkThemeState
                ? dark["temp-top-left-div"]
                : light["temp-top-left-div"]
            }`}
          >
            <text
              className={`${
                darkThemeState ? dark["contry-text"] : light["contry-text"]
              }`}
            >
              {map.liveSiteData.city}
            </text>
            <text
              className={`${
                darkThemeState ? dark["city-text"] : light["city-text"]
              }`}
            >
              {map.liveSiteData.country}
            </text>
          </div>
          <div
            className={`col-4 ${
              darkThemeState
                ? dark["temp-top-mid-div"]
                : light["temp-top-mid-div"]
            }`}
          >
            <HiSun />
          </div>
          <div
            className={`col-4 ${
              darkThemeState
                ? dark["temp-top-right-div"]
                : light["temp-top-right-div"]
            }`}
          >
            <text
              className={`${
                darkThemeState ? dark["temp-value"] : light["temp-value"]
              }`}
            >
              {map.liveSiteData.temperature} C
            </text>
            <text
              className={`${
                darkThemeState ? dark["date-value"] : light["date-value"]
              }`}
            >
              {map.liveSiteData.date}
            </text>
            <text
              className={`${
                darkThemeState ? dark["time-value"] : light["time-value"]
              }`}
            >
              {map.liveSiteData.time}
            </text>
          </div>
        </div>
        <div
          className={`row m-0 mt-3 p-0 ${
            darkThemeState ? dark["temp-bottom-div"] : light["temp-bottom-div"]
          }`}
        >
          <div
            className={`col-3 m-0 p-0 ${
              darkThemeState
                ? dark["temp-bottom-sub1-div"]
                : light["temp-bottom-sub1-div"]
            }`}
          >
            <div
              className={`col-3 ${
                darkThemeState
                  ? dark["temp-bottom-fst-div"]
                  : light["temp-bottom-fst-div"]
              }`}
            >
              <div
                className={`col-3 ${
                  darkThemeState
                    ? dark["fst-title-div"]
                    : light["fst-title-div"]
                }`}
              >
                Carbo Dioxide
              </div>
              <div
                className={`col-3 ${
                  darkThemeState ? dark["fst-icon-div"] : light["fst-icon-div"]
                }`}
              >
                <FaRegFrown />
              </div>
              <div
                className={`col-3 ${
                  darkThemeState
                    ? dark["fst-value-div"]
                    : light["fst-value-div"]
                }`}
              >
                28 ppn
              </div>
            </div>
          </div>
          <div
            className={`col-3 m-0 p-0 ${
              darkThemeState
                ? dark["temp-bottom-sub2-div"]
                : light["temp-bottom-sub2-div"]
            }`}
          >
            <div
              className={`col-3 ${
                darkThemeState
                  ? dark["temp-bottom-fst-div"]
                  : light["temp-bottom-fst-div"]
              }`}
            >
              <div
                className={`col-3 ${
                  darkThemeState
                    ? dark["fst-title-div"]
                    : light["fst-title-div"]
                }`}
              >
                Atmospheric Preassure
              </div>
              <div
                className={`col-3 ${
                  darkThemeState ? dark["fst-icon-div"] : light["fst-icon-div"]
                }`}
              >
                <HiSwitchHorizontal />
              </div>
              <div
                className={`col-3 ${
                  darkThemeState
                    ? dark["fst-value-div"]
                    : light["fst-value-div"]
                }`}
              >
                {" "}
                962.5 hPa{" "}
              </div>
            </div>
          </div>
          <div
            className={`col-3 m-0 p-0 ${
              darkThemeState
                ? dark["temp-bottom-sub3-div"]
                : light["temp-bottom-sub3-div"]
            }`}
          >
            <div
              className={`col-3 ${
                darkThemeState
                  ? dark["temp-bottom-fst-div"]
                  : light["temp-bottom-fst-div"]
              }`}
            >
              <div
                className={`col-3 ${
                  darkThemeState
                    ? dark["fst-title-div"]
                    : light["fst-title-div"]
                }`}
              >
                Humidity
              </div>
              <div
                className={`col-3 ${
                  darkThemeState ? dark["fst-icon-div"] : light["fst-icon-div"]
                }`}
              >
                <MdWaterDrop />
              </div>
              <div
                className={`col-3 ${
                  darkThemeState
                    ? dark["fst-value-div"]
                    : light["fst-value-div"]
                }`}
              >
                {map.liveSiteData.humidity}
              </div>
            </div>
          </div>
          <div
            className={`col-3 m-0 p-0 ${
              darkThemeState
                ? dark["temp-bottom-sub4-div"]
                : light["temp-bottom-sub4-div"]
            }`}
          >
            <div
              className={`col-3 ${
                darkThemeState
                  ? dark["temp-bottom-fst-div"]
                  : light["temp-bottom-fst-div"]
              }`}
            >
              <div
                className={`col-3 ${
                  darkThemeState
                    ? dark["fst-title-div"]
                    : light["fst-title-div"]
                }`}
              >
                Brightness Value
              </div>
              <div
                className={`col-3 ${
                  darkThemeState ? dark["fst-icon-div"] : light["fst-icon-div"]
                }`}
              >
                <MdBrightness6 />
              </div>
              <div
                className={`col-3 ${
                  darkThemeState
                    ? dark["fst-value-div"]
                    : light["fst-value-div"]
                }`}
              >
                2000 lx
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TempLiveSite.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
  map: state.map,
});

export default connect(mapStateToProps, { getWeatherDetails })(TempLiveSite);
