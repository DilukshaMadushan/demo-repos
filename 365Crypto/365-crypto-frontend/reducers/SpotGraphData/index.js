import {
  GET_SINGLECOINDATA_SUCCESS,
  GET_PAIRDATA_SUCCESS,
  GET_EXCHANGESTATE_SUCCESS,
  LOADING_TRUE,
} from "../../actions/types";

const intialState = {
  isLoading: true,
  coinDataList: [],
  coin_Id: null,
  pairDataList: [],
  exchangeState: null,
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SINGLECOINDATA_SUCCESS:
      return {
        ...state,
        coinDataList: payload.data,
        coin_Id: payload.coin_Id,
        isLoading: false,
      };
    case GET_PAIRDATA_SUCCESS:
      return {
        ...state,
        pairDataList: payload.data,
        exchangeState: payload.data
          .filter((item) => item.symbolCode.slice(-4) === "USDT")
          .reverse()[0].exchange._id,
        isLoading: false,
      };
    case GET_EXCHANGESTATE_SUCCESS:
      return {
        ...state,
        exchangeState: payload,
        isLoading: false,
      };
    case LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}
