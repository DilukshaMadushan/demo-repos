import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  // VERIFICATION_FAIL_VIA_LINK,
  LOG_OUT,
  // SET_SHOW_VERIFY_MODAL_TRUE,
  SET_VERIFICATION_LOADING_FALSE,
  SET_VERIFICATION_LOADING_TRUE,
  // SET_SHOW_FORGOT_PASSWORD_MODAL_TRUE,
  // SET_SHOW_FORGOT_PASSWORD_MODAL_FALSE,
  // SET_SHOW_RESET_PASSWORD_MODAL_TRUE,
  // SET_SHOW_RESET_PASSWORD_MODAL_FALSE,
  // FORGOT_PASSWORD_SEND_SUCCESS,
  // RESET_PASSWORD_SEND_SUCCESS,
  // RESEND_VERIFICATION_SUCCESS,
  // RESEND_VERIFICATION_FAIL,
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
  showForgotPasswordModal: false,
  showResetPasswordModal: false,
  resetPasswordToken: "",
  buttonDisable: true,
};

export default function (state = initialState, action) {
  const { type, payload, registerEmail } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        userId: payload.userId,
        success: payload.success,
        loading: false,
        showVerificationModel: true,
        registerEmail: registerEmail,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        token: "",
        loading: false,
        isAuthenticated: false,
      };

    case VERIFICATION_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload.token,
        success: payload.success,
        loading: false,
        isAuthenticated: true,
        showVerificationModel: false,
      };

    case VERIFICATION_FAIL:
      return {
        ...state,
        token: "",
        loading: false,
        isAuthenticated: false,
        showVerificationModel: true,
      };

    case SET_VERIFICATION_LOADING_TRUE:
      return {
        ...state,
        verificationLoading: true,
      };

    case SET_VERIFICATION_LOADING_FALSE:
      return {
        ...state,
        verificationLoading: false,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload.token,
        success: payload.success,
        loading: false,
        isAuthenticated: true,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        token: "",
        success: payload.success,
        buttonDisable: false,
        isAuthenticated: false,
        loading: false,
      };

    case LOG_OUT:
      return {
        ...state,
        token: "",
        loading: false,
        isAuthenticated: false,
      };

    // case SET_SHOW_VERIFY_MODAL_TRUE:
    //   return {
    //     ...state,
    //     showVerificationModel: true,
    //   };

    // case SET_SHOW_FORGOT_PASSWORD_MODAL_TRUE:
    //   return {
    //     ...state,
    //     showForgotPasswordModal: true,
    //   };

    // case SET_SHOW_FORGOT_PASSWORD_MODAL_FALSE:
    //   return {
    //     ...state,
    //     showForgotPasswordModal: false,
    //   };
    // case SET_SHOW_RESET_PASSWORD_MODAL_TRUE:
    //   return {
    //     ...state,
    //     showResetPasswordModal: true,
    //     resetPasswordToken: payload,
    //   };

    // case SET_SHOW_RESET_PASSWORD_MODAL_FALSE:
    //   return {
    //     ...state,
    //     showResetPasswordModal: false,
    //     resetPasswordToken: '',
    //   };
    // case FORGOT_PASSWORD_SEND_SUCCESS:
    //   return {
    //     ...state,
    //     success: payload.success,
    //     loading: false,
    //   };
    // case RESET_PASSWORD_SEND_SUCCESS:
    //   return {
    //     ...state,
    //     success: payload.success,
    //     loading: false,
    //   };
    // case RESEND_VERIFICATION_SUCCESS:
    //   return {
    //     ...state,
    //     success: payload.success,
    //     loading: false,
    //   };
    // case RESEND_VERIFICATION_FAIL:
    //   return {
    //     ...state,
    //     success: payload.success,
    //     loading: false,
    //   };

    default:
      return state;
  }
}
