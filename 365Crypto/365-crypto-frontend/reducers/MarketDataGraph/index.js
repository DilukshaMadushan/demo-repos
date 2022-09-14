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
} from "../../actions/types";

const intialState = {
  seeAllButtonState: true,
  isLoading: true,
  isLoadingGraphThree: true,
  isLoadingGraphFour: true,
  isLoadingGraphSix: true,
  isLoadingLiquidation: true,
  isLoadingFuturePerpetual: true,
  openInterestHistoryDataList: [],
  volumeHistoryDataList: [],
  oiVolumeDataList: [],
  graphState: null,
  shortLongDataList: [],
  exchangeId: null,
  exchangeName: null,
  futuresPerpetualName: null,
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SEEALL_BUTTON_STATE_SUCCESS:
      return {
        ...state,
        seeAllButtonState: payload,
      };
    case GET_FUTURESDATA_SUCCESS:
      return {
        ...state,
        openInterestHistoryDataList: payload.openInterstDataList,
        volumeHistoryDataList: payload.volumeDataList,
        exchangeName: payload.exchangeName,
        exchangeId: payload.exchangeId,
        isLoadingFuturePerpetual: false,
      };

    case GET_PERPETUALDATA_SUCCESS:
      return {
        ...state,
        openInterestHistoryDataList: payload.openInterstDataList,
        volumeHistoryDataList: payload.volumeDataList,
        exchangeName: payload.exchangeName,
        exchangeId: payload.exchangeId,
        isLoadingFuturePerpetual: false,
      };
    case GET_OIVOLUMEDATA_SUCCESS:
      return {
        ...state,
        oiVolumeDataList: payload.data,
        futuresPerpetualName: payload.typeName,
        graphState: payload.graphState,
        isLoadingGraphThree: false,
        isLoadingGraphFour: false,
        isLoadingGraphSix: false,
        isLoading: false,
      };
    case GET_SHORTLONG_SUCCESS:
      return {
        ...state,
        shortLongDataList: payload.data,
        futuresPerpetualName: payload.typeName,
        graphState: payload.graphState,
        isLoadingLiquidation: false,
      };
    case FUTURE_PERPETUAL_LOADING_SUCCES:
      return {
        ...state,
        isLoadingFuturePerpetual: true,
      };
    case GRAPH_THREE_LOADING_SUCCES:
      return {
        ...state,
        isLoadingGraphThree: true,
      };
    case GRAPH_FOUR_LOADING_SUCCES:
      return {
        ...state,
        isLoadingGraphFour: true,
      };
    case GRAPH_SIX_LOADING_SUCCES:
      return {
        ...state,
        isLoadingGraphSix: true,
      };
    case GET_LIQUIDATION_LOADING_SUCCES:
      return {
        ...state,
        isLoadingLiquidation: true,
      };
    default:
      return state;
  }
}
