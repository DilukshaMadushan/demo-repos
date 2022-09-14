import { GET_COIN_SUCCESS } from "../../../actions/types";

const intialState = {
  loadingCoin: true,
  coinList: [],
  coinId: null,
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COIN_SUCCESS:
      return {
        ...state,
        coinList: payload,
        coinId: payload
          .filter((item) => item.symbol === "BTC")
          .map((item) => item._id),
        loadingCoin: false,
      };

    default:
      return state;
  }
}
