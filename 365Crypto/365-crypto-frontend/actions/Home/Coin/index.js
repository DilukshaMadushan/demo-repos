import axios from "axios";
import { GET_COIN_SUCCESS } from "../../types";

// SET ENVIRONMENT BASE URL
const BASE_URL = process.env.BASE_URL;

// get all coin
export const getCoins = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/coin?sort=-marketCap`);
    dispatch({
      type: GET_COIN_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};
