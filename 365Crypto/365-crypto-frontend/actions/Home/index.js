import axios from "axios";
import { setAlert } from "../Alert";

import {
  GET_WELCOME_COINEVENTS_SUCCESS,
  GET_WELCOME_SOCIALFEEDS_SUCCESS,
  GET_WELCOME_CRYPTONEWS_SUCCESS,
  SHOW_LEARNMOREABOUT365,
  HIDE_LEARNMOREABOUT365,
  SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_SUCCESS_FALSE,
  GET_FITEREDCOINS_MARKETDATA,
  SET_FILTERED_COINS_NULL,
  UNSUBSCRIPTION_SUCCESS,
} from "../types";

// SET ENVIRONMENT BASE URL
const BASE_URL = process.env.BASE_URL;
const SENDINBLUE_URL = process.env.SENDINBLUE_URL;
const SENDINBLUE_APITOKEN = process.env.SENDINBLUE_APITOKEN;

// @desc        Get welcome coin events
// @api         /api/coin-events
// @access      public

export const getWelcomeCoinEvents = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/coin-events?sort=dateEvent&`);

    dispatch({
      type: GET_WELCOME_COINEVENTS_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Get welcome social feeds
// @api         /api/coin-events
// @access      public

export const getWelcomeSocialFeeds = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/social-feeds?sort=-date&limit=6`
    );

    dispatch({
      type: GET_WELCOME_SOCIALFEEDS_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Get welcome crypto news
// @api         /api/coin-events
// @access      public

export const getWelcomeCryptoNews = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/crypto-news?sort=-date&limit=5`
    );

    dispatch({
      type: GET_WELCOME_CRYPTONEWS_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc        SHOW_LEARNMOREABOUT365
// @api
// @access      public

export const showLearnMoreAbout365 = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_LEARNMOREABOUT365,
    });
  } catch (err) {
    console.log(err);
  }
};
// @desc        HIDE_LEARNMOREABOUT365
// @api
// @access      public

export const hideLearnMoreAbout365 = () => async (dispatch) => {
  try {
    dispatch({
      type: HIDE_LEARNMOREABOUT365,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Subscription submit
// @api         https://api.sendinblue.com/v3/contacts/doubleOptinConfirmation
// @ai-token	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
// @access      public

export const subscriptionSubmit = (subscriptionEmail) => async (dispatch) => {
  dispatch({
    type: SUBSCRIPTION_SUCCESS_FALSE,
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
    email: subscriptionEmail,
  });

  try {
    const response = await axios.post(
      `${BASE_URL}/subscribe-email`,
      body,
      config
    );

    dispatch({
      type: SUBSCRIPTION_SUCCESS,
      payload: response.data,
    });

    dispatch(setAlert("Verification email sent successfully.", "success"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Invalid email.Please try again.", "error"));
  }
};

export const unSubscriptionSubmit =
  (unSubscriptionEmail) => async (dispatch) => {
    //API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    };

    // Stringyfy Json Body
    const body = JSON.stringify({
      email: unSubscriptionEmail,
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/unsubscribe-email`,
        body,
        config
      );

      dispatch({
        type: UNSUBSCRIPTION_SUCCESS,
        payload: response.data,
      });

      dispatch(setAlert("Unsubscribed successfully.", "success"));
    } catch (err) {
      console.log(err);
      dispatch(
        setAlert(
          "could not be unsubscribed or already unsubscribed.Please try again.",
          "error"
        )
      );
    }
  };

// @desc        Getting Filtered Coins for MarketData
// @api         /api/crypto-news-coins{filterURL}
// @access      public

export const getMarketDataFilteredCoins = (filterURL) => async (dispatch) => {
  // dispatch({
  // 	type: SET_CRYPTONEWS_COINS_LOADING_TRUE,
  // });

  try {
    const response = await axios.get(`${BASE_URL}/coin?${filterURL}`);

    dispatch({
      type: GET_FITEREDCOINS_MARKETDATA,
      payload: response.data.data,
    });
  } catch (err) {
    // dispatch({
    // 	type: SET_CRYPTONEWS_COINS_LOADING_FALSE,
    // });
    console.log(err);
  }
};

// @desc       Sey null to Filtered Coins for MarketData
// @api
// @access      public

export const setNullMarketDataFilteredCoins = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_FILTERED_COINS_NULL,
    });
  } catch (err) {
    console.log(err);
  }
};
