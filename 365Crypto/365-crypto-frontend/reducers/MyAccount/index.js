import {
  CHANGE_USER_DETAILS_SUCCESS,
  CHANGE_USER_PASSWORD_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  GET_TICKBOX_SUCCESS,
  GET_SECTION_SUCCESS,
  GET_ACCOUNT_SUCCESS,
  SHOW_SUBSCRIPTION_MESSAGE_MODAL,
  HIDE_SUBSCRIPTION_MESSAGE_MODAL,
} from "../../actions/types";

const initialState = {
  userId: "",
  token: "",
  success: false,
  isAuthenticated: false,
  loading: true,
  showVerificationModel: false,
  verificationLoading: false,
  registerEmail: "",
  subscriptionState: false,
  sectionState: "Account_Details",
  accountState: false,
  userEmail: "",
  userName: "",
  prevSubscriptionState: false,
  showSubscribeMsgModal: false,
};

export default function (state = initialState, action) {
  const { type, payload, registerEmail } = action;

  switch (type) {
    case CHANGE_USER_DETAILS_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        userId: payload.userId,
        success: payload.success,
        loading: false,
        showVerificationModel: true,
        registerEmail: registerEmail,
      };

    case CHANGE_USER_PASSWORD_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        userId: payload.userId,
        success: payload.success,
        loading: false,
        showVerificationModel: true,
        registerEmail: registerEmail,
      };

    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        subscriptionState: payload.isMarketingPromotion,
        prevSubscriptionState: payload.isMarketingPromotion,
        userEmail: payload.email,
        userName: payload.name,
      };
    case GET_TICKBOX_SUCCESS:
      return {
        ...state,
        subscriptionState: payload,
      };

    case GET_SECTION_SUCCESS:
      return {
        ...state,
        sectionState: payload,
      };

    case GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        accountState: payload,
      };
    case SHOW_SUBSCRIPTION_MESSAGE_MODAL:
      return {
        ...state,
        showSubscribeMsgModal: true,
      };
    case HIDE_SUBSCRIPTION_MESSAGE_MODAL:
      return {
        ...state,
        showSubscribeMsgModal: false,
      };

    default:
      return state;
  }
}
