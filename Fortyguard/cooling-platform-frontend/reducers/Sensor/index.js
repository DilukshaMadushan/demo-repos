import {
  GET_LOCATION_SUCCESS,
  GET_SENSOR_DETAILS_SUCCESS,
} from "../../actions/types";

const initialState = {
  sensorDataList: null,
  selectedDataList: null,
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        sensorDataList: payload,
        isLoading: false,
      };

    case GET_SENSOR_DETAILS_SUCCESS:
      return {
        ...state,
        selectedDataList: payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
