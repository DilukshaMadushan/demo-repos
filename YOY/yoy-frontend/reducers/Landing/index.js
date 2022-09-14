import { GET_LANDING_DATA } from "@actions/types";

const initialState = {
  landingData: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LANDING_DATA:
      return { ...state, landingData: payload };
    default:
      return state;
  }
}
