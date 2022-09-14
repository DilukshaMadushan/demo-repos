import {
  GET_ON_DEMAND_DATA,
  GET_HOME_FIRST_SECTION,
  GET_VIDEO_VIEW,
  GET_VIDEO_VIEW_SECOND,
  GET_CATEGORY_VIDEOS,
  GET_MY_WISH_LIST,
} from "@actions/types";

const initialState = {
  onDemand: [],
  homeFirstSectionData: [],
  bannerData: [],
  videoViewState: null,
  videoViewSecondState: null,
  categoryVideos: [],
  wishList: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ON_DEMAND_DATA:
      return { ...state, onDemand: payload };
    case GET_HOME_FIRST_SECTION:
      let tempData = { ...state, homeFirstSectionData: payload.data };
      return { ...tempData, bannerData: payload.banner.data };
    case GET_VIDEO_VIEW:
      return { ...state, videoViewState: payload };
    case GET_VIDEO_VIEW_SECOND:
      return { ...state, videoViewSecondState: payload };
    case GET_CATEGORY_VIDEOS:
      return { ...state, categoryVideos: payload };
    case GET_MY_WISH_LIST:
      return { ...state, wishList: payload };
    default:
      return state;
  }
}
