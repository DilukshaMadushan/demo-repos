import axios from "axios";
import { setAlert } from "../Alert";
import { REPORT_ISSUE_SUCCESS, GET_SUCCESS_FALSE } from "../types";

// SET ENVIRONMENT BASE URL
const BASE_URL = process.env.BASE_URL;
const REPORT_ISSUE_EMAIL = process.env.REPORT_ISSUE_EMAIL;

export const reportIssueSubmit = (reportIssueData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const body = JSON.stringify({
    fromEmail: REPORT_ISSUE_EMAIL,
    toEmail: reportIssueData.email,
    subject: reportIssueData.subject,
    message: reportIssueData.message,
  });

  try {
    const response = await axios.post(`${BASE_URL}/send-email`, body, config);

    dispatch({
      type: REPORT_ISSUE_SUCCESS,
      payload: response.data,
    });
    dispatch(setAlert("Issue Report successfull.", "success"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Issue report not sent.Try again.", "error"));
  }
};

export const successFalseChange = (successFalse) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SUCCESS_FALSE,
      payload: successFalse,
    });
  } catch (err) {
    console.log(err);
  }
};
