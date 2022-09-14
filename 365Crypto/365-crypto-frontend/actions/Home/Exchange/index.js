import axios from "axios";
import { GET_EXCHANGE_SUCCESS } from "../../types";

// SET ENVIRONMENT BASE URL
const BASE_URL = process.env.BASE_URL;

// get all exchanges
export const getExchanges = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/exchange?sort=name`);

    dispatch({
      type: GET_EXCHANGE_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};
