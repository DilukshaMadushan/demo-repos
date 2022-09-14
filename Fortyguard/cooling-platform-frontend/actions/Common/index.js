import axios from 'axios';

import { SET_THEME_OPPOSITE, SET_TAB_STATE, UPDATE_WEATHER_DATA } from '../types';

// @desc        Set To Dark Theme
// @api
// @access      public

export const setToOppositeTheme = (newState) => async (dispatch) => {
	try {
		dispatch({
			type: SET_THEME_OPPOSITE,
			payload: newState,
		});
	} catch (err) {
		console.log(err);
	}
};
// @desc        Set Tab State
// @api
// @access      public

export const setTabState = (tabState) => async (dispatch) => {
	try {
		dispatch({
			type: SET_TAB_STATE,
			payload: tabState,
		});
	} catch (err) {
		console.log(err);
	}
};

// @desc        Weather API
// @api
// @access      public
export const getWeatherDetails = (lat,lon) => async (dispatch) => {
	try {
	  const res = await axios.get(
		"http://api.weatherapi.com/v1/current.json?key=b2cc86830b7349c7a0b123558223101&q="+lat+","+lon+"&aqi=no"
	  );

	  let nowDate = new Date(); 

	  let liveSiteData = {
		temperature: res.data.current.temp_c,
		humidity: res.data.current.humidity,
		co2: 0,
		brightness: 0,
		atmosphericPreassure: 0,
		city: res.data.location.region,
		country: res.data.location.country,
		date: nowDate.toDateString(),
		time: nowDate.toLocaleTimeString()
	  }

	  dispatch({
			type: UPDATE_WEATHER_DATA,
			payload: liveSiteData,
	  });
	  
	} catch (err) {
	  console.log(err);
	}
  };
