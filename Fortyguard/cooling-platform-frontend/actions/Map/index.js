import axios from "axios";
import {
  SEARCH_CITIES,
  GET_HEAT_POINTS_SUCCESS,
  GET_HEAT_POINTS_LOADING,
  SELECT_FILTER_DATE,
  SELECT_FILTER_TYPE,
} from "../types";
import { setAlert } from "../Alert";

import {getWeatherDetails} from '../Common';

// SET ENVIRONMENT BASE URL
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

// Get searched city
export const searchCities = (city) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?&access_token=pk.eyJ1IjoiYW5kcmVsaXZ5IiwiYSI6ImNrdmtqMmh4dTBxeGwycW4xbWNhemJlNWsifQ.1MNWkNAY7IE32ZDYt7b5sw`
    );

    if (res.data.features.length > 0) {
      let location = {
        lg: res.data.features[0].center[0],
        lat: res.data.features[0].center[1],
      };

      dispatch({
        type: SEARCH_CITIES,
        payload: location,
      });
      dispatch(setAlert(" found.", "success"));
    }
  } catch (err) {
    console.log(err);
    dispatch(setAlert("City not found.", "error"));
  }
};

// Get searched city
export const getHeatPoints = (date) => async (dispatch) => {
  dispatch({
    type: GET_HEAT_POINTS_LOADING,
    payload: location,
  });

  const msLocalBefore = new Date(date);
  const newMslocal = new Date(date);
  const msLocal = new Date(newMslocal.setDate(newMslocal.getDate() + 1));

  // const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  // const msLocalBefore = date.getTime() - offsetMs - 30 * 60 * 1000;
  // const msLocal = date.getTime() - offsetMs;
  // const dateLocal = new Date(msLocal);
  // const iso = dateLocal.toISOString();
  // const isoLocal = iso.slice(0, 19);
  
  const filter_date = "limit=5000&time[gte]=" + msLocalBefore.toISOString().slice(0,10) + "&" + "time[lt]=" + msLocal.toISOString().slice(0,10);

  try {
    const res = await axios.get(
      `${BACKEND_BASE_URL}/heat-points?${
        date !== (null || undefined) && filter_date
      }`
    );

    // console.log(res.data, "HeatPoints");

    dispatch({
      type: GET_HEAT_POINTS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Heatpoints error.", "error"));
  }
};

// Select date from filter date dropdown
export const getFilterDate = (date) => async (dispatch) => {
  dispatch({
    type: SELECT_FILTER_DATE,
    payload: date,
  });
};

// Select type from filter type dropdown
export const getFilterType = (type) => async (dispatch) => {
  dispatch({
    type: SELECT_FILTER_TYPE,
    payload: type,
  });
};
