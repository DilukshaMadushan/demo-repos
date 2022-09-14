import axios from 'axios';
import { setAlert } from '../Alert';
import {
  SET_CRYPTONEWS_LOADING_TRUE,
  SET_CRYPTONEWS_LOADING_FALSE,
  GET_CRYPTONEWS_SUCCESS,
  GET_CRYPTONEWS_COINS_SUCCESS,
  SET_CRYPTONEWS_COINS_LOADING_TRUE,
  SET_CRYPTONEWS_COINS_LOADING_FALSE,
  GET_CRYPTONEWS_FILTERED_COINS_SUCCESS,
  GET_FILTERED_CRYPTONEWS_SUCCESS,
  GET_SENTIMENTCHARTDATA_SUCCESS,
  GET_FILTERED_SENTIMENTCHARTDATA_SUCCESS,
  SET_SENTIMENTCHARTDATA_LOADING_TRUE,
  SET_SELECTED_SENTIMENT,
  CHECK_NEXTPAGE_CRYPTONEWS,
} from '../types';

// SET ENVIRONMENT BASE URL
const BASE_URL = process.env.BASE_URL;

// @desc        Getting Crypto News
// @api         /api/crypto-news
// @access      public

export const getCryptoNews = () => async dispatch => {
  dispatch({
    type: SET_CRYPTONEWS_LOADING_TRUE,
  });

  try {
    const response = await axios.get(`${BASE_URL}/crypto-news?sort=-date`);

    dispatch({
      type: GET_CRYPTONEWS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Getting Crypto News Coins
// @api         /api/crypto-news-coins
// @access      public

export const getCryptoNewsCoins = () => async dispatch => {
  try {
    const response = await axios.get(`${BASE_URL}/coin?sort=symbol`);

    dispatch({
      type: GET_CRYPTONEWS_COINS_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Getting Crypto News Filtered Coins
// @api         /api/crypto-news-coins{filterURL}
// @access      public

export const getCryptoNewsFilteredCoins = filterURL => async dispatch => {
  dispatch({
    type: SET_CRYPTONEWS_COINS_LOADING_TRUE,
  });

  try {
    const response = await axios.get(
      `${BASE_URL}/coin?sort=symbol&${filterURL}`
    );

    dispatch({
      type: GET_CRYPTONEWS_FILTERED_COINS_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type: SET_CRYPTONEWS_COINS_LOADING_FALSE,
    });
    console.log(err);
    dispatch(setAlert('No results found', 'error'));
  }
};

// @desc        Getting Filtered Crypto News
// @api         /api/crypto-news?{filterURL}
// @access      public

export const getFilteredCryptoNews = filterURL => async dispatch => {
  dispatch({
    type: SET_CRYPTONEWS_LOADING_TRUE,
  });
  try {
    const response = await axios.get(
      `${BASE_URL}/crypto-news?sort=-date&${filterURL}`
    );

    dispatch({
      type: GET_FILTERED_CRYPTONEWS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: SET_CRYPTONEWS_LOADING_FALSE,
    });
    console.log(err);
    dispatch(setAlert('No results found', 'error'));
  }
};

// @desc        Getting Sentiment Chart Data
// @api         /api/crypto-news-sentiment
// @access      public

export const getSentimentChartData = () => async dispatch => {
  dispatch({
    type: SET_SENTIMENTCHARTDATA_LOADING_TRUE,
  });

  try {
    const response = await axios.get(
      `${BASE_URL}/crypto-news-sentiment?limit=7`
    );

    dispatch({
      type: GET_SENTIMENTCHARTDATA_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc       Set Selected Sentiment

// @api         /api/crypto-news-sentiment

// @access      public

export const setSelectedSentiment = selectedSentiment => async dispatch => {
  try {
    dispatch({
      type: SET_SELECTED_SENTIMENT,

      payload: selectedSentiment,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getFilteredSentimentChartData = filterURL => async dispatch => {
  dispatch({
    type: SET_SENTIMENTCHARTDATA_LOADING_TRUE,
  });

  try {
    const response = await axios.get(
      `${BASE_URL}/crypto-news-sentiment?${filterURL}`
    );

    dispatch({
      type: GET_FILTERED_SENTIMENTCHARTDATA_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Check Next Page Crypto News
// @api         /api/crypto-news?{filterURL}
// @access      public

export const checkNextPageCryptoNews = nextpageFilterURL => async dispatch => {
  try {
    const response = await axios.get(
      `${BASE_URL}/crypto-news?sort=-date&${nextpageFilterURL}`
    );

    dispatch({
      type: CHECK_NEXTPAGE_CRYPTONEWS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err, 'next crypto news page data error');
  }
};
