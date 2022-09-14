import { UPLOAD_SUCCESS, UPLOAD_LOADING } from "../../actions/types";

const initialState = {
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPLOAD_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
