import {
  GET_WEBSOCKET_SUCCESS,
  GET_COINDATA_SUCCESS,
  GET_FUTUREEXCHANGEDATA_SUCCESS,
  GET_PERPETUALEXCHANGEDATA_SUCCESS,
  LOADING_TRUE,
  GET_MARKETDATACHANGE_SUCCESS,
  SET_WEBSOCKETDATALIST_NULL,
} from '../types';

//websocket data

export const getWebsocketData = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_WEBSOCKET_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//coin data

export const webSocketParams0 = (type, coin) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    dispatch({
      type: GET_COINDATA_SUCCESS,
      payload: { type, coin },
    });
  } catch (err) {
    console.log(err);
  }
};

//exchange data

export const webSocketParams1 = (type, exchange, coin) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    dispatch({
      type: GET_FUTUREEXCHANGEDATA_SUCCESS,
      payload: { type, exchange, coin },
    });
  } catch (err) {
    console.log(err);
  }
};

//exchange data
export const webSocketParams2 = (type, exchange, coin) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    dispatch({
      type: GET_PERPETUALEXCHANGEDATA_SUCCESS,
      payload: { type, exchange, coin },
    });
  } catch (err) {
    console.log(err);
  }
};

//context api sol
export const marketDataChanger = (changeId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MARKETDATACHANGE_SUCCESS,
      payload: changeId,
    });
  } catch (err) {
    console.log(err);
  }
};

//Set websocket data list null

export const setWebsocketDataListNull = () => async (dispatch) => {
  console.log('Run');
  try {
    dispatch({
      type: SET_WEBSOCKETDATALIST_NULL,
    });
  } catch (err) {
    console.log(err);
  }
};
