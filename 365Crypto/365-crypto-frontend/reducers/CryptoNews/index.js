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
  SET_SENTIMENTCHARTDATA_LOADING_FALSE,
  SET_SELECTED_SENTIMENT,
  CHECK_NEXTPAGE_CRYPTONEWS,
} from '../../actions/types';

const intialState = {
  loadingCryptoNews: true,
  loadingCryptoNewsCoins: true,
  loadingSentimentChart: true,
  cryptoNewsList: null,
  cryptoNewsCoinsList: null,
  sentimentChartDataList: null,
  pagination: '',
  selectedSentiment: '',
  nextPageCryptoNews: null,
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CRYPTONEWS_SUCCESS:
      return {
        ...state,
        cryptoNewsList: payload.data,
        loadingCryptoNews: false,
        pagination: payload.pagination,
      };

    case GET_CRYPTONEWS_COINS_SUCCESS:
      return {
        ...state,
        cryptoNewsCoinsList: payload,
        loadingCryptoNewsCoins: false,
      };

    case SET_CRYPTONEWS_COINS_LOADING_TRUE:
      return {
        ...state,
        loadingCryptoNewsCoins: true,
      };

    case SET_CRYPTONEWS_COINS_LOADING_FALSE:
      return {
        ...state,
        loadingCryptoNewsCoins: false,
      };

    case GET_CRYPTONEWS_FILTERED_COINS_SUCCESS:
      return {
        ...state,
        cryptoNewsCoinsList: payload,
        loadingCryptoNewsCoins: false,
      };

    case GET_FILTERED_CRYPTONEWS_SUCCESS:
      return {
        ...state,
        cryptoNewsList: payload.data,
        loadingCryptoNews: false,
        pagination: payload.pagination,
      };

    case SET_CRYPTONEWS_LOADING_TRUE:
      return {
        ...state,
        loadingCryptoNews: true,
      };

    case SET_CRYPTONEWS_LOADING_FALSE:
      return {
        ...state,
        loadingCryptoNews: false,
      };

    case GET_SENTIMENTCHARTDATA_SUCCESS:
      return {
        ...state,
        sentimentChartDataList: payload,
        loadingSentimentChart: false,
      };
    case GET_FILTERED_SENTIMENTCHARTDATA_SUCCESS:
      return {
        ...state,
        sentimentChartDataList: payload,
        loadingSentimentChart: false,
      };

    case SET_SENTIMENTCHARTDATA_LOADING_TRUE:
      return {
        ...state,
        loadingSentimentChart: true,
      };

    case SET_SENTIMENTCHARTDATA_LOADING_FALSE:
      return {
        ...state,
        loadingSentimentChart: false,
      };
    case SET_SELECTED_SENTIMENT:
      return {
        ...state,
        selectedSentiment: payload,
      };

    case CHECK_NEXTPAGE_CRYPTONEWS:
      return {
        ...state,
        nextPageCryptoNews: payload.data,
      };

    default:
      return state;
  }
}
