import axios from "axios";
import {
  GET_SINGLECOINDATA_SUCCESS,
  GET_PAIRDATA_SUCCESS,
  GET_EXCHANGESTATE_SUCCESS,
  LOADING_TRUE,
} from "../types";

// SET ENVIRONMENT BASE URL
const BASE_URL = process.env.BASE_URL;

export const getCoinData = (coin_Id) => async (dispatch) => {
  // get single coindata
  try {
    const response = await axios.get(`${BASE_URL}/coin/${coin_Id}`);
    dispatch({
      type: GET_SINGLECOINDATA_SUCCESS,
      payload: {
        data: response.data.data,
        coin_Id: coin_Id,
      },
    });
    dispatch({
      type: LOADING_TRUE,
    });
  } catch (err) {
    console.log(err);
  }
  //get coin pairs
  try {
    const response = await axios.get(
      `${BASE_URL}/pair?type=spot&coin=${coin_Id}`
    );
    dispatch({
      type: GET_PAIRDATA_SUCCESS,
      payload: {
        data: response.data.data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getExchangeState = (exchangeState) => async (dispatch) => {
  try {
    dispatch({
      type: GET_EXCHANGESTATE_SUCCESS,
      payload: exchangeState,
    });
  } catch (err) {
    console.log(err);
  }
};
