import axios from "axios";
import { setAlert } from "../Alert";

import {
  CHANGE_USER_DETAILS_SUCCESS,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_SUBSCRIPTION_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  GET_TICKBOX_SUCCESS,
  GET_SECTION_SUCCESS,
  GET_ACCOUNT_SUCCESS,
  SHOW_SUBSCRIPTION_MESSAGE_MODAL,
  HIDE_SUBSCRIPTION_MESSAGE_MODAL,
} from "../types";

// SET ENVIRONMENT BASE URL
const BASE_URL = process.env.BASE_URL;

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

// @desc        Change User Details
// @api         /api/auth/update-details
// @access      public

export const changeUserDetails =
  (registerFormData, token) => async (dispatch) => {
    //API Header configarations

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    //Stringyfy Json Body
    const body = JSON.stringify({
      name: registerFormData.fullName,
      email: registerFormData.email,
    });

    try {
      const response = await axios.put(
        `${BASE_URL}/auth/update-details`,
        body,
        config
      );

      dispatch({
        type: CHANGE_USER_PASSWORD_SUCCESS,
        payload: response.data,
        registerEmail: registerFormData.email,
      });

      dispatch(setAlert("User Name and Email change successful .", "success"));
    } catch (err) {
      console.log(err);
      dispatch(setAlert(err.response.data.error, "error"));
    }
  };

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

// @desc        Change password
// @api         /api/auth/update-password
// @access      public

export const changeUserPassword =
  (registerFormData, token) => async (dispatch) => {
    //API Header configarations

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // withCredentials: true,
    };
    //Stringyfy Json Body
    const body = JSON.stringify({
      currentPassword: registerFormData.currentPassword,
      newPassword: registerFormData.newPassword,
    });

    try {
      const response = await axios.put(
        `${BASE_URL}/auth/update-password`,
        body,
        config
      );

      dispatch({
        type: CHANGE_USER_DETAILS_SUCCESS,
        payload: response.data,
        registerEmail: registerFormData.email,
      });

      dispatch(setAlert("Password change successful.", "success"));
    } catch (err) {
      console.log(err);
      dispatch(setAlert(err.response.data.error, "error"));
    }
  };

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

// @desc        Change User Details
// @api         /api/auth/update-details
// @access      public

export const changeUserSubscription =
  (subscription, token) => async (dispatch) => {
    //API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // withCredentials: true,
    };
    //Stringyfy Json Body
    const body = JSON.stringify({
      isMarketingPromotion: subscription,
    });

    try {
      const response = await axios.put(
        `${BASE_URL}/auth/update-details`,
        body,
        config
      );

      dispatch({
        type: CHANGE_USER_SUBSCRIPTION_SUCCESS,
        payload: response.data,
      });

      dispatch(setAlert("Subscription change successful .", "success"));
    } catch (err) {
      console.log(err);
      dispatch(setAlert("Subscription change failed", "error"));
    }
  };

/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

// @desc        get User Details
// @api         /api/auth/me
// @access      public

// get all coin
export const getUserAllDetails = (token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // withCredentials: true,
  };

  try {
    const response = await axios.get(`${BASE_URL}/auth/me`, config);
    dispatch({
      type: GET_USER_DETAILS_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getPromotionTickState = (state) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TICKBOX_SUCCESS,
      payload: state,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setAccountSection = (state) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SECTION_SUCCESS,
      payload: state,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setAccountOpen = (state) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ACCOUNT_SUCCESS,
      payload: state,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Show/Hide Subscribe Succes Message Modal
// @api
// @access      public

export const setSubscribeMsgModal =
  (showSubscriptionMessage) => async (dispatch) => {
    try {
      if (showSubscriptionMessage) {
        dispatch({
          type: SHOW_SUBSCRIPTION_MESSAGE_MODAL,
        });
      } else {
        dispatch({
          type: HIDE_SUBSCRIPTION_MESSAGE_MODAL,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch(setAlert("Something went wrong", "error"));
    }
  };
