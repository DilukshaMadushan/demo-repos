import { REPORT_ISSUE_SUCCESS, GET_SUCCESS_FALSE } from "../../actions/types";

const initialState = {
  token: "",
  success: false,
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REPORT_ISSUE_SUCCESS:
      return {
        ...state,
        token: payload.data,
        success: payload.success,
        isLoading: false,
      };
    case GET_SUCCESS_FALSE:
      return {
        ...state,
        success: payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
