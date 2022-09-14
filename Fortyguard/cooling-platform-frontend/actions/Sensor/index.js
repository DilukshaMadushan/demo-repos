import axios from "axios";
import { GET_LOCATION_SUCCESS, GET_SENSOR_DETAILS_SUCCESS } from "../types";
import { setAlert } from "../Alert";

// SET ENVIRONMENT BASE URL
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

// @desc        location data
// @api         /api/heat-points
// @access      public
export const getLocationPoints = () => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/sensors`);

    dispatch({
      type: GET_LOCATION_SUCCESS,
      payload: response.data.data,
    });

    dispatch(setAlert("Success", "Success"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Failed.", "error"));
  }
};

export const getSensorArrayDetails = (selectedSensor) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/sensors?name=${selectedSensor}`
    );

    dispatch({
      type: GET_SENSOR_DETAILS_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};
