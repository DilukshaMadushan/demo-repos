import axios from "axios";
import { setAlert } from "../Alert";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  LOG_OUT,
  //   SET_SHOW_VERIFY_MODAL_TRUE,
  SET_VERIFICATION_LOADING_TRUE,
  SET_VERIFICATION_LOADING_FALSE,
  //   VERIFICATION_FAIL_VIA_LINK,
  //   RESEND_VERIFICATION_FAIL,
  //   RESEND_VERIFICATION_SUCCESS,
  //   SET_SHOW_FORGOT_PASSWORD_MODAL_TRUE,
  //   SET_SHOW_FORGOT_PASSWORD_MODAL_FALSE,
  //   SET_SHOW_RESET_PASSWORD_MODAL_TRUE,
  //   SET_SHOW_RESET_PASSWORD_MODAL_FALSE,
  //   FORGOT_PASSWORD_SEND_SUCCESS,
  //   RESET_PASSWORD_SEND_SUCCESS,
} from "../types";

// SET ENVIRONMENT BASE URL

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

// @desc        Register User
// @api         /api/auth/register
// @access      public

export const registerBoxSubmit = (registerFormData) => async (dispatch) => {
  //API Header configarations

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  //Stringyfy Json Body
  const body = JSON.stringify({
    name: registerFormData.fullName,
    email: registerFormData.email,
    password: registerFormData.password,
  });

  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/auth/register`,
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
      registerEmail: registerFormData.email,
    });

    dispatch(setAlert("Verification code sent to your email.", "success"));
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: "Register Failed!",
    });

    dispatch(setAlert("Register Failed!", "error"));
  }
};

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

export const verificationSubmit =
  (inputNumbers, userId) => async (dispatch) => {
    dispatch({
      type: SET_VERIFICATION_LOADING_TRUE,
    });

    //API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    // Stringyfy Json Body
    const body = JSON.stringify({
      verificationCode: inputNumbers,
    });

    try {
      const response = await axios.put(
        `${BACKEND_BASE_URL}/auth/verify/${userId}`,
        body,
        config
      );

      dispatch({
        type: VERIFICATION_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_VERIFICATION_LOADING_FALSE,
      });

      dispatch(setAlert("User logged in successfully.", "success"));
    } catch (err) {
      dispatch({
        type: VERIFICATION_FAIL,
        payload: "Verification Failed!",
      });
      dispatch({
        type: SET_VERIFICATION_LOADING_FALSE,
      });
      dispatch(setAlert("Verification Failed!", "error"));
    }
  };

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

// @desc        Login Existing User
// @api         /api/auth/login
// @access      public
export const loginBoxSubmit = (loginFormData) => async (dispatch) => {
  //API Header configarations
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  // Stringyfy Json Body
  const body = JSON.stringify({
    email: loginFormData.email,
    password: loginFormData.password,
  });

  console.log(body, "body");

  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/auth/login`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    dispatch(setAlert("User logged in successfully.", "success"));
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: "Login Failed!",
    });

    dispatch(setAlert("Login Failed!", "error"));
  }
};

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

export const logoutButtonSubmit = () => (dispatch) => {
  try {
    dispatch({
      type: LOG_OUT,
    });
    dispatch(setAlert("User logged out successfully.", "success"));
  } catch (err) {
    console.log(err);
  }
};
