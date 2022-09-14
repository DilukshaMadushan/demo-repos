import {
  GET_WEBSOCKET_SUCCESS,
  GET_COINDATA_SUCCESS,
  GET_FUTUREEXCHANGEDATA_SUCCESS,
  GET_PERPETUALEXCHANGEDATA_SUCCESS,
  LOADING_TRUE,
  GET_MARKETDATACHANGE_SUCCESS,
  SET_WEBSOCKETDATALIST_NULL,
} from '../../actions/types';

const intialState = {
  webSocketDataList: null,
  coinData: null,
  exchangeData: null,
  type: null,
  isLoading: true,
  changeId: '1',
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WEBSOCKET_SUCCESS:
      return {
        ...state,
        webSocketDataList: payload,
        isLoading: false,
      };
    case GET_COINDATA_SUCCESS:
      return {
        ...state,
        coinData: payload.coin,
        type: payload.type,
        exchangeData: null,
      };
    case GET_FUTUREEXCHANGEDATA_SUCCESS:
      return {
        ...state,
        exchangeData: payload.exchange,
        type: payload.type,
        coinData: payload.coin,
      };
    case GET_PERPETUALEXCHANGEDATA_SUCCESS:
      return {
        ...state,
        exchangeData: payload.exchange,
        type: payload.type,
        coinData: payload.coin,
      };
    case GET_MARKETDATACHANGE_SUCCESS:
      return {
        ...state,
        changeId: payload,
      };
    case LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };

    case SET_WEBSOCKETDATALIST_NULL:
      return {
        ...state,
        webSocketDataList: null,
      };

    default:
      return state;
  }
}
