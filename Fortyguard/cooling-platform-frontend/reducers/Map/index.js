import {
  SEARCH_CITIES,
  GET_HEAT_POINTS_SUCCESS,
  GET_HEAT_POINTS_LOADING,
  SELECT_FILTER_DATE,
  SELECT_FILTER_TYPE,
  UPDATE_WEATHER_DATA
} from "../../actions/types";

const intialState = {
  searchedCity: {
    lg: 54.61591,
    lat: 24.42729,
  },
  heatPoints: [],
  date: new Date(Date.now()),
  type: "T[C]",
  loading: false,
  
  liveSiteData: {
    temperature: 0,
    humidity: 0,
    co2: 0,
    brightness: 0,
    atmosphericPreassure: 0,
    city: "",
    country: "",
    date: null,
    time: null,
  }
  
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_CITIES:
      return {
        ...state,
        searchedCity: payload,
      };
    case GET_HEAT_POINTS_SUCCESS:
      return {
        ...state,
        heatPoints: payload,
        loading: false,
      };
    case GET_HEAT_POINTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SELECT_FILTER_DATE:
      return {
        ...state,
        date: payload,
      };
    case SELECT_FILTER_TYPE:
      return {
        ...state,
        type: payload,
      };
    case UPDATE_WEATHER_DATA:
      return {
        ...state,
        liveSiteData: payload
      }

    default:
      return state;
  }
}
