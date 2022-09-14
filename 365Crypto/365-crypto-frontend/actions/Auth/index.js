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
  SET_SHOW_VERIFY_MODAL_TRUE,
  SET_VERIFICATION_LOADING_TRUE,
  SET_VERIFICATION_LOADING_FALSE,
  VERIFICATION_FAIL_VIA_LINK,
  RESEND_VERIFICATION_FAIL,
  RESEND_VERIFICATION_SUCCESS,
  SET_SHOW_FORGOT_PASSWORD_MODAL_TRUE,
  SET_SHOW_FORGOT_PASSWORD_MODAL_FALSE,
  SET_SHOW_RESET_PASSWORD_MODAL_TRUE,
  SET_SHOW_RESET_PASSWORD_MODAL_FALSE,
  FORGOT_PASSWORD_SEND_SUCCESS,
  RESET_PASSWORD_SEND_SUCCESS,
} from "../types";

// SET ENVIRONMENT BASE URL
const BASE_URL = process.env.BASE_URL;

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

  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    dispatch(setAlert("User logged in successfully.", "success"));
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data,
    });

    dispatch(setAlert(err.response.data.error, "error"));
  }
};

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

// @desc        Register User
// @api         /api/auth/register
// @access      public

export const registerBoxSubmit =
  (registerFormData, subscription) => async (dispatch) => {
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
      isMarketingPromotion: subscription,
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/register`,
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
        payload: err.response.data,
      });

      dispatch(setAlert(err.response.data.error, "error"));
    }
  };

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

// @desc        Login Existing User
// @api         /api/login
// @access      public
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    // Stringyfy Json Body
    const body = JSON.stringify({ email, password });

    try {
      const response = await axios.post(`${BASE_URL}/login`, body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(err);
    }
  };

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
        `${BASE_URL}/auth/verify/${userId}`,
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
        payload: err.response.data,
      });
      dispatch({
        type: SET_VERIFICATION_LOADING_FALSE,
      });
      dispatch(setAlert(err.response.data.error, "error"));
    }
  };

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

// @desc        Log out User
// @api         -
// @access      public

export const logoutButtonSubmit = () => (dispatch) => {
  try {
    dispatch({
      type: LOG_OUT,
    });
    dispatch(setAlert("User logged out successfully.", "success"));
  } catch (err) {
    // dispatch({
    // 	type: LOGIN_FAIL,
    // 	payload: err.response.data,
    // });
    // dispatch(setAlert(errors, 'danger'));
  }
};

// @desc        Set verify modal true
// @api         -
// @access      public

export const setShowVerificationModal = () => (dispatch) => {
  try {
    dispatch({
      type: SET_SHOW_VERIFY_MODAL_TRUE,
    });
  } catch (err) {
    console.log(err);
  }
};

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

export const verificationSubmitViaLink =
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
        `${BASE_URL}/auth/verify/${userId}`,
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

      dispatch(setAlert("Email is Verified", "success"));
    } catch (err) {
      dispatch({
        type: VERIFICATION_FAIL_VIA_LINK,
        payload: err.response.data,
      });

      dispatch(setAlert(err.response.data.error, "error"));
    }
  };

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

// @desc        Set forgot password modal show
// @api         -
// @access      public

export const setShowForgotPasswordModal = (showmodal) => (dispatch) => {
  try {
    if (showmodal) {
      dispatch({
        type: SET_SHOW_FORGOT_PASSWORD_MODAL_TRUE,
      });
    } else {
      dispatch({
        type: SET_SHOW_FORGOT_PASSWORD_MODAL_FALSE,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc        Forgotpassword email send
// @api         /api/auth/forgot-password
// @access      public

export const submitForgotPassword = (email) => async (dispatch) => {
  //API Header configarations
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  // Stringyfy Json Body
  const body = JSON.stringify({
    email: email,
  });

  try {
    const response = await axios.post(
      `${BASE_URL}/auth/forgot-password`,
      // "http://localhost:5000/api/auth/forgot-password",
      body,
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SEND_SUCCESS,
      payload: response.data,
    });

    dispatch(setAlert("Password reset link was send to your email", "success"));
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error"));
  }
};
// @desc        Reset Password
// @api         /api/auth/reset-password
// @access      public

export const submitResetPassword =
  (password, resetToken) => async (dispatch) => {
    //API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    // Stringyfy Json Body
    const body = JSON.stringify({
      password: password,
    });

    try {
      const response = await axios.put(
        `${BASE_URL}/auth/reset-password/${resetToken}`,
        // `http://localhost:5000/api/auth/reset-password/${resetToken}`,
        body,
        config
      );
      dispatch({
        type: RESET_PASSWORD_SEND_SUCCESS,
        payload: response.data,
      });

      dispatch(setAlert("Password reset succesfull", "success"));
    } catch (err) {
      dispatch(setAlert(err.response.data.error, "error"));
    }
  };

// @desc        show Reset password modal
// @api         -
// @access      public

export const setShowResetPasswordModal = (showmodal, token) => (dispatch) => {
  try {
    if (showmodal) {
      dispatch({
        type: SET_SHOW_RESET_PASSWORD_MODAL_TRUE,
        payload: token,
      });
    } else {
      dispatch({
        type: SET_SHOW_RESET_PASSWORD_MODAL_FALSE,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc        Resend verification
// @api         /api/auth/resend-verification
// @access      private
export const resendVerification = (userId) => async (dispatch) => {
  //API Header configarations
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  // Stringyfy Json Body
  const body = JSON.stringify({
    userid: userId,
  });

  try {
    const response = await axios.put(
      `${BASE_URL}/auth/resend-verification`,
      body,
      config
    );

    dispatch({
      type: RESEND_VERIFICATION_SUCCESS,
      payload: response.data,
    });

    dispatch(setAlert("Verification send succesfully", "success"));
  } catch (err) {
    dispatch({
      type: RESEND_VERIFICATION_FAIL,
      payload: err.response.data,
    });

    dispatch(setAlert(err.response.data.error, "error"));
  }
};
