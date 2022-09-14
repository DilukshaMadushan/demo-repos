import React, { useState } from "react";
import styles from "./index.module.css";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSensorArrayDetails } from "../../../actions/Sensor";

const index = ({
  common: { darkThemeState },
  sensor: { isLoading, sensorDataList },
  getSensorArrayDetails,
}) => {
  const [selectedItem, setSelectedItem] = useState("buttonOne");
  const [selectedSensor, setSelectedSensor] = useState(
    "Ambient Street Temperature (Fixed, Pole Mounted)"
  );

  return (
    <div
      className={
        darkThemeState
          ? `${styles["carSensingDiv"]}`
          : `${styles["carSensingDivLight"]}`
      }
    >
      <div className={`${styles["carFirstDiv"]}`}>
        <div className={`${styles["detailsDiv"]}`}>
          <text className={`${styles["carSensingText"]}`}>Car Sensing</text>
        </div>
        <div className={`${styles["chapterDiv"]}`}>
          <text className={`${styles["chapterOne"]}`}>Details :</text>
          <text className={`${styles["chapterTwo"]}`}>{selectedSensor}</text>
        </div>
      </div>
      <div className={`${styles["buttonDiv"]}`}>
        <div
          className={`${styles["buttonOne"]}`}
          onClick={() => {
            setSelectedItem("buttonOne");
            setSelectedSensor(sensorDataList && sensorDataList[0].description);
            getSensorArrayDetails(sensorDataList && sensorDataList[0].name);
          }}
        >
          {selectedItem === "buttonOne" ? (
            <img
              src="./Ambient Sensor.jpeg"
              className={`${styles["carImageSelected"]}`}
            />
          ) : (
            <img
              src="./Ambient Sensor.jpeg"
              className={`${styles["carImage"]}`}
            />
          )}
        </div>
        <div
          className={`${styles["buttonTwo"]}`}
          onClick={() => {
            setSelectedItem("buttonTwo");
            setSelsetSelectedSensor(
              sensorDataList && sensorDataList[1].description
            );
          }}
        >
          {selectedItem === "buttonTwo" ? (
            <img
              src="./sensorImage.jpeg"
              className={`${styles["carImageSelected"]}`}
            />
          ) : (
            <img src="./sensorImage.jpeg" className={`${styles["carImage"]}`} />
          )}
        </div>
        <div
          className={`${styles["buttonThree"]}`}
          onClick={() => {
            setSelectedItem("buttonThree");
            setSelectedSensor(sensorDataList && sensorDataList[2].description);
          }}
        >
          {selectedItem === "buttonThree" ? (
            <img
              src="./Core Surface Temperature.jpeg"
              className={`${styles["carImageSelected"]}`}
            />
          ) : (
            <img
              src="./Core Surface Temperature.jpeg"
              className={`${styles["carImage"]}`}
            />
          )}
        </div>
        <div
          className={`${styles["buttonFour"]}`}
          onClick={() => {
            setSelectedItem("buttonFour");
            setSelectedSensor(sensorDataList && sensorDataList[3].description);
          }}
        >
          {selectedItem === "buttonFour" ? (
            <img
              src="./Reflected Energy.jpeg"
              className={`${styles["carImageSelected"]}`}
            />
          ) : (
            <img
              src="./Reflected Energy.jpeg"
              className={`${styles["carImage"]}`}
            />
          )}
        </div>
        <div
          className={`${styles["buttonFive"]}`}
          onClick={() => {
            setSelectedItem("buttonFive");
            setSelectedSenssetSelectedSensor(
              sensorDataList && sensorDataList[4].description
            );
          }}
        >
          {selectedItem === "buttonFive" ? (
            <img
              src="./Solar Energy.jpeg"
              className={`${styles["carImageSelected"]}`}
            />
          ) : (
            <img
              src="./Solar Energy.jpeg"
              className={`${styles["carImage"]}`}
            />
          )}
        </div>
        <div
          className={`${styles["buttonSix"]}`}
          onClick={() => {
            setSelectedItem("buttonSix");
            setSelectedSensor(sensorDataList && sensorDataList[5].description);
          }}
        >
          {selectedItem === "buttonSix" ? (
            <img
              src="./Thermal Drone.PNG"
              className={`${styles["carImageSelected"]}`}
            />
          ) : (
            <img
              src="./Thermal Drone.PNG"
              className={`${styles["carImage"]}`}
            />
          )}
        </div>
        <div
          className={`${styles["buttonSeven"]}`}
          onClick={() => {
            setSelectedItem("buttonSeven");
            setSelectedSensor(sensorDataList && sensorDataList[6].description);
          }}
        >
          {selectedItem === "buttonSeven" ? (
            <img
              src="./Shuttle Cart Sensor.jpeg"
              className={`${styles["carImageSelected"]}`}
            />
          ) : (
            <img
              src="./Shuttle Cart Sensor.jpeg"
              className={`${styles["carImage"]}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};
index.propTypes = {
  getSensorArrayDetails: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
  sensor: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
  sensor: state.sensor,
});

export default connect(mapStateToProps, { getSensorArrayDetails })(index);
