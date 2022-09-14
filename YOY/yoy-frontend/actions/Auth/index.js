import { setAlert } from "../Alert";
import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  SET_LOGIN_MODAL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_REGISTER_MODAL,
} from "../types";
import Router from "next/router";

const BASE_URL = process.env.BASE_URL;

// @desc        Login user.
// @api
// @access      public
export const loginUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/userApi/v4/login?id=&token=&language=en&email=${formData.email}&password=${formData.password}&timezone=America/Mexico_City&login_by=manual&device_type=web&device_token=123456`
    );

    if (res.data && !res.data.success) {
      dispatch(setAlert(res.data.error_messages, "error"));
      dispatch({
        type: LOGIN_FAIL,
      });
    } else {
      dispatch({ type: SET_LOGIN_MODAL, payload: false });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      Router.push("/on-demand");
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// @desc        Regiser user.
// @api
// @access      public
export const registerUser = (formData) => async (dispatch) => {
  try {
    const formDataBody = new FormData();
    formDataBody.append("login_by", "manual");
    formDataBody.append("device_token", "123456");
    formDataBody.append("device_type", "web");
    formDataBody.append("language", "pt");
    formDataBody.append("login_by", "manual");
    formDataBody.append("name", formData.userName);
    formDataBody.append("password", formData.password);
    formDataBody.append("email", formData.email);

    const res = await axios.post(
      `${BASE_URL}/userApi/v4/register`,
      formDataBody
    );

    if (res.data && !res.data.success) {
      dispatch(setAlert(res.data.error_messages, "error"));
      dispatch({
        type: REGISTER_FAIL,
      });
    } else {
      dispatch({ type: SET_REGISTER_MODAL, payload: false });
      dispatch(setAlert(res.data.message, "success"));
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      Router.push("/on-demand");
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
