import axios from "axios";
import { GET_LANDING_DATA } from "../types";

// @desc        Get Landing main image.
// @api
// @access      public
export const getLandingData = () => async dispatch => {
  try {
    const res = await axios.get(
      "https://admin.yoytv.mx/userApi/get_settings_json"
    );

    dispatch({
      type: GET_LANDING_DATA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
