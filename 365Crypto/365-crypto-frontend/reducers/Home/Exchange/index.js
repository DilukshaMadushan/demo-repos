import { GET_EXCHANGE_SUCCESS } from "../../../actions/types";

const intialState = {
  loadingExchange: true,
  exchangeList: [],
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXCHANGE_SUCCESS:
      return {
        ...state,
        exchangeList: payload,
        loadingExchange: false,
      };

    default:
      return state;
  }
}
