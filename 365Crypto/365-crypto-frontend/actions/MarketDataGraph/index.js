import axios from "axios";
import {
  GET_FUTURESDATA_SUCCESS,
  GET_PERPETUALDATA_SUCCESS,
  GET_OIVOLUMEDATA_SUCCESS,
  GET_SHORTLONG_SUCCESS,
  FUTURE_PERPETUAL_LOADING_SUCCES,
  GRAPH_THREE_LOADING_SUCCES,
  GRAPH_FOUR_LOADING_SUCCES,
  GRAPH_SIX_LOADING_SUCCES,
  GET_LIQUIDATION_LOADING_SUCCES,
  GET_SEEALL_BUTTON_STATE_SUCCESS,
} from "../types";

// SET ENVIRONMENT BASE URL
const BASE_URL = process.env.BASE_URL;

// SET see all button state
export const getSeeAllButtonState = (state) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SEEALL_BUTTON_STATE_SUCCESS,
      payload: state,
    });
  } catch (err) {
    console.log(err);
  }
};

//get futures data one & two graph
export const getFuturesData =
  (exchangeId, exchangeName) => async (dispatch) => {
    dispatch({
      type: FUTURE_PERPETUAL_LOADING_SUCCES,
    });
    try {
      const response1 = await axios.get(
        `${BASE_URL}/future?exchange=${exchangeId}&sort=-openInterest`
      );
      const response2 = await axios.get(
        `${BASE_URL}/future?exchange=${exchangeId}&sort=-volume`
      );

      dispatch({
        type: GET_FUTURESDATA_SUCCESS,
        payload: {
          openInterstDataList: response1.data.data,
          volumeDataList: response2.data.data,
          exchangeId: exchangeId,
          exchangeName: exchangeName,
        },
      });
      //set initial states to getOiVolumeData action
      dispatch(
        getOiVolumeData(
          "1min",
          "future",
          exchangeId,
          response1.data.data[0].pair._id,
          "all"
        )
      );
      //set initial states to getShortLongData action
      dispatch(
        getShortLongData(
          "1min",
          "future",
          exchangeId,
          response1.data.data[0].pair._id,
          "all"
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

//get perpetual data one & two graph
export const getPerpetualData =
  (exchangeId, exchangeName) => async (dispatch) => {
    dispatch({
      type: FUTURE_PERPETUAL_LOADING_SUCCES,
    });
    try {
      const response1 = await axios.get(
        `${BASE_URL}/perpetual?exchange=${exchangeId}&sort=-openInterest`
      );
      const response2 = await axios.get(
        `${BASE_URL}/perpetual?exchange=${exchangeId}&sort=-volume`
      );
      dispatch({
        type: GET_PERPETUALDATA_SUCCESS,
        payload: {
          openInterstDataList: response1.data.data,
          volumeDataList: response2.data.data,
          exchangeId: exchangeId,
          exchangeName: exchangeName,
        },
      });
      //set initial states to getOiVolumeData action
      dispatch(
        getOiVolumeData(
          "1min",
          "perpetual",
          exchangeId,
          response1 && response1.data.data[0].pair._id,
          "all"
        )
      );
      //set initial states to getShortLongData action
      dispatch(
        getShortLongData(
          "1min",
          "perpetual",
          exchangeId,
          response1 && response1.data.data[0].pair._id,
          "all"
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

//get open interest & volume history data three , four & six graph
export const getOiVolumeData =
  (timeFrame, typeName, exchangeId, pairId, graphState) => async (dispatch) => {
    if (graphState === "all" || graphState === "three") {
      dispatch({
        type: GRAPH_THREE_LOADING_SUCCES,
      });
    }
    if (graphState === "all" || graphState === "four") {
      dispatch({
        type: GRAPH_FOUR_LOADING_SUCCES,
      });
    }
    if (graphState === "all" || graphState === "six") {
      dispatch({
        type: GRAPH_SIX_LOADING_SUCCES,
      });
    }

    if (pairId) {
      try {
        const response = await axios.get(
          `${BASE_URL}/open-interest-volume-history/${timeFrame}?type=${typeName}&exchange=${exchangeId}&pair=${pairId}&sort=-createdAt`
        );
        dispatch({
          type: GET_OIVOLUMEDATA_SUCCESS,
          payload: {
            data: response.data.data,
            typeName: typeName,
            graphState: graphState,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

//get short & long history data five graph
export const getShortLongData =
  (timeFrame, typeName, exchangeId, pairId, graphState) => async (dispatch) => {
    dispatch({
      type: GET_LIQUIDATION_LOADING_SUCCES,
    });
    if (pairId) {
      try {
        const response = await axios.get(
          `${BASE_URL}/liquidation/${timeFrame}?type=${typeName}&exchange=${exchangeId}&pair=${pairId}&sort=-createdAt`
        );
        dispatch({
          type: GET_SHORTLONG_SUCCESS,
          payload: {
            data: response.data.data,
            typeName: typeName,
            graphState: graphState,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
