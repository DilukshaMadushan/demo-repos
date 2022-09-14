import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "@actions/types";

const initialState = {
  loading: true,
  isAuthenticated: false,
  data: null,
  userId: null,
  token: null,
  subProfileId: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        data: payload,
        userId: payload.data.id,
        token: payload.data.token,
        subProfileId: payload.data.sub_profile_id,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}
