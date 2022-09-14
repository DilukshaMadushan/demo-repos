import axios from "axios";
import { UPLOAD_SUCCESS, UPLOAD_LOADING } from "../types";
import { setAlert } from "../Alert";

// SET ENVIRONMENT BASE URL
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

// @desc        Upload data
// @api         /api/heat-points
// @access      public
export const uploadCSV = (csv_data) => async (dispatch) => {
  //Loading spinner
  dispatch({
    type: UPLOAD_LOADING,
  });

  //API Header configarations
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `${BACKEND_BASE_URL}/heat-points`,
      csv_data,
      config
    );

    //Spinner Stop
    dispatch({
      type: UPLOAD_SUCCESS,
    });

    setTimeout(() => {
      window.location.reload(true);
    }, 1500);

    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Data Upload Failed.", "error"));
  }
};
