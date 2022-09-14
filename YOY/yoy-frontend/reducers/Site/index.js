import {
  SET_LOGIN_MODAL,
  SET_REGISTER_MODAL,
  SET_LIKE_MODAL,
  SET_SHARE_MODAL,
  SET_MENU_ITEM_STATE,
  SET_POPUP_MODAL,
} from "@actions/types";

const initialState = {
  loginModal: false,
  registerModal: false,
  likeModal: {
    visible: false,
    title: "",
    image: "",
    videoId: null,
  },
  shareModal: {
    visible: false,
    title: "",
    image: "",
    videoId: null,
  },
  menuItemState: 2,
  popupModal: {
    data: null,
    visible: false,
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOGIN_MODAL:
      return { ...state, loginModal: payload };
    case SET_REGISTER_MODAL:
      return { ...state, registerModal: payload };
    case SET_LIKE_MODAL:
      return { ...state, likeModal: { ...payload } };
    case SET_SHARE_MODAL:
      return { ...state, shareModal: { ...payload } };
    case SET_MENU_ITEM_STATE:
      return { ...state, menuItemState: payload };
    case SET_POPUP_MODAL:
      return { ...state, popupModal: { ...payload } };
    default:
      return state;
  }
}
